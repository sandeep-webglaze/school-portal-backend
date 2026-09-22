import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { S3Client, PutObjectCommand, DeleteObjectCommandInput, DeleteObjectCommand, DeleteObjectCommandOutput, PutObjectCommandOutput, ListObjectsV2CommandInput, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { EnvironmentVariables } from '@/src/config/env';

// ---------------------------------------------------------------------------
// Storage service.
//
// AWS S3 is used FIRST. If the S3 keys are empty/missing, uploads and deletes
// automatically fall back to Cloudinary (when its keys are set). The public
// method names are unchanged, so every module that already uses S3Service
// (school, city, user, facility, upload) gets this fallback for free.
// ---------------------------------------------------------------------------

@Injectable()
export class S3Service {
  private logger = new Logger(S3Service.name);
  private region: string;
  s3: S3Client;
  private bucket: string;
  private baseUrl: string;
  private preSignedUrlExpiresIn: number = 3600;

  private s3Enabled = false;
  private cloudinaryEnabled = false;
  private preferCloudinary = false;

  constructor(private configService: ConfigService<EnvironmentVariables>) {
    this.region = configService.get<string>('S3_REGION') || 'ap-south-1'; // default to MUMBAI, IN
    this.bucket = configService.get<string>('S3_BUCKET');
    this.baseUrl = configService.get<string>('FILE_CDN_HOST');

    const accessKeyId = configService.get<string>('S3_ACCESS_KEY_ID');
    const secretAccessKey = configService.get<string>('S3_SECRET_ACCESS_KEY');

    // S3 is considered configured only when all essential keys are present.
    this.s3Enabled = Boolean(accessKeyId && secretAccessKey && this.bucket);

    if (this.s3Enabled) {
      this.s3 = new S3Client({
        region: this.region,
        credentials: { accessKeyId, secretAccessKey },
      });
      this.logger.log('S3 client connected (primary storage)');
    } else {
      this.logger.warn('S3 keys not set — will use Cloudinary fallback if configured');
    }

    // Configure Cloudinary if its keys are present.
    const cloudName = configService.get<string>('CLOUDINARY_CLOUD_NAME');
    const apiKey = configService.get<string>('CLOUDINARY_API_KEY');
    const apiSecret = configService.get<string>('CLOUDINARY_API_SECRET');
    this.cloudinaryEnabled = Boolean(cloudName && apiKey && apiSecret);
    if (this.cloudinaryEnabled) {
      cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
        secure: true,
      });
      this.logger.log(
        this.s3Enabled
          ? 'Cloudinary configured (fallback)'
          : 'Cloudinary configured (primary storage)',
      );
    }

    // Optional explicit switch. STORAGE_PROVIDER = 's3' | 'cloudinary'.
    //  - not set  -> AUTO: use S3 if its keys exist, otherwise Cloudinary.
    //  - 'cloudinary' -> force Cloudinary (when its keys exist).
    //  - 's3'         -> force S3.
    const provider = (configService.get<string>('STORAGE_PROVIDER') || '').toLowerCase();
    this.preferCloudinary = provider === 'cloudinary' && this.cloudinaryEnabled;
    if (provider === 's3' && !this.s3Enabled) {
      this.logger.warn('STORAGE_PROVIDER=s3 but S3 keys are missing');
    }
    if (provider === 'cloudinary' && !this.cloudinaryEnabled) {
      this.logger.warn('STORAGE_PROVIDER=cloudinary but Cloudinary keys are missing');
    }
    this.logger.log(
      `Active image storage: ${this.preferCloudinary ? 'Cloudinary' : this.s3Enabled ? 'S3' : this.cloudinaryEnabled ? 'Cloudinary' : 'NONE'}`,
    );

    if (!this.s3Enabled && !this.cloudinaryEnabled) {
      this.logger.error('No image storage configured — set S3 or Cloudinary keys');
    }
  }

  private objectKey(path: string) {
    return (
      this.configService.get<string>('S3_BUCKET_PUBLIC_FOLDER') + '/' + path
    );
  }

  private generateObjectUrl(key: string) {
    return `${this.baseUrl}/${key}`;
  }

  validateUrl(url: string | URL) {
    try {
      if (url === "") return false;
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  }

  generateUniqueFileName(originalName: string) {
    const fileNameWithoutExtension = originalName.substring(0, originalName.lastIndexOf('.')).replace(/[^a-zA-Z0-9]/g, '_');
    const fileExtension = originalName.substring(originalName.lastIndexOf('.') + 1);
    const epochTime = Date.now().toString();
    return `${fileNameWithoutExtension}_${epochTime}.${fileExtension}`;
  }

  private getKeyFromUrl(url: string) {
    if (!this.validateUrl(url)) return url;
    const Url = new URL(url);
    return Url.pathname.slice(1); // remove initial '/'
  }

  // ------------------------- Cloudinary helpers -------------------------
  private isCloudinaryUrl(url: string) {
    return typeof url === 'string' && url.includes('res.cloudinary.com');
  }

  private uploadToCloudinary(
    file: Buffer,
    path: string,
  ): Promise<string> {
    const publicFolder =
      this.configService.get<string>('S3_BUCKET_PUBLIC_FOLDER') || 'uploads';
    const lastSlash = path.lastIndexOf('/');
    const dir = lastSlash >= 0 ? path.slice(0, lastSlash) : '';
    const fileName = lastSlash >= 0 ? path.slice(lastSlash + 1) : path;
    const dotIdx = fileName.lastIndexOf('.');
    const publicId = dotIdx > 0 ? fileName.substring(0, dotIdx) : fileName;
    const folder = dir ? `${publicFolder}/${dir}` : publicFolder;

    return new Promise<string>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder, public_id: publicId, resource_type: 'auto', overwrite: true },
        (err, result) => {
          if (err || !result) {
            this.logger.error('Cloudinary upload failed', err as any);
            return reject(new InternalServerErrorException('Failed to save file'));
          }
          resolve(result.secure_url);
        },
      );
      stream.end(file);
    });
  }

  private cloudinaryPublicId(url: string): string {
    try {
      const u = new URL(url);
      const parts = u.pathname.split('/');
      const uploadIdx = parts.findIndex((p) => p === 'upload');
      let rest = uploadIdx >= 0 ? parts.slice(uploadIdx + 1) : parts;
      if (rest[0] && /^v\d+$/.test(rest[0])) rest = rest.slice(1); // drop version segment
      const last = rest[rest.length - 1] ?? '';
      const dot = last.lastIndexOf('.');
      rest[rest.length - 1] = dot > 0 ? last.substring(0, dot) : last; // drop extension
      return rest.join('/');
    } catch {
      return url;
    }
  }

  private async listCloudinary(
    prefix: string,
  ): Promise<{ objects: string[]; totalCount: number }> {
    if (!this.cloudinaryEnabled) return { objects: [], totalCount: 0 };
    const publicFolder =
      this.configService.get<string>('S3_BUCKET_PUBLIC_FOLDER') || 'uploads';
    const full = prefix ? `${publicFolder}/${prefix}` : publicFolder;
    try {
      const res: any = await cloudinary.api.resources({
        type: 'upload',
        prefix: full,
        max_results: 500,
      });
      const objects = (res.resources || []).map((r: any) => r.secure_url);
      return { objects, totalCount: res.total_count ?? objects.length };
    } catch (err) {
      this.logger.error('Error listing Cloudinary resources', err as any);
      return { objects: [], totalCount: 0 };
    }
  }

  // ------------------------- public API -------------------------
  async uploadFileSignedUrl(file: Buffer, contentType: string, path: string) {
    // Primary: S3 (unless STORAGE_PROVIDER forces Cloudinary)
    if (this.s3Enabled && !this.preferCloudinary) {
      const Key = this.objectKey(path);
      const input: PutObjectCommand = new PutObjectCommand({
        Body: file,
        Bucket: this.bucket,
        Key: Key,
        ContentType: contentType,
      });
      try {
        const response: PutObjectCommandOutput = await this.s3.send(input);
        if (response.$metadata.httpStatusCode !== 200) throw '';
        return this.generateObjectUrl(Key);
      } catch (err) {
        this.logger.error('Error while uploading file to S3 Bucket', err);
        // If Cloudinary is available, try it instead of failing outright.
        if (this.cloudinaryEnabled) {
          this.logger.warn('Falling back to Cloudinary for this upload');
          return this.uploadToCloudinary(file, path);
        }
        throw new InternalServerErrorException('Failed to save file');
      }
    }

    // Fallback: Cloudinary
    if (this.cloudinaryEnabled) {
      return this.uploadToCloudinary(file, path);
    }

    throw new InternalServerErrorException('No image storage is configured');
  }

  async listObjects(
    prefix: string = '',
    searchQuery?: string
  ): Promise<{ objects: string[]; totalCount: number }> {
    // Use Cloudinary listing when S3 is off or Cloudinary is forced.
    if (!this.s3Enabled || this.preferCloudinary) {
      return this.listCloudinary(prefix);
    }

    const path = this.configService.get<string>('S3_BUCKET_PUBLIC_FOLDER') + '/' + prefix;

    const input: ListObjectsV2CommandInput = {
      Bucket: this.bucket,
      Prefix: path,
    };

    if (searchQuery) {
      input.Prefix = prefix + searchQuery; // Update the prefix to include the search query
    }
    try {
      const response = await this.s3.send(new ListObjectsV2Command(input));
      const objects = (response.Contents ?? []).map((object) => object.Key);
      const totalCount = response.KeyCount || 0;
      return { objects, totalCount };
    } catch (err) {
      this.logger.error('Error while listing objects in S3 Bucket', err);
      throw new InternalServerErrorException('Failed to list objects');
    }
  }

  async removeFile(url: string) {
    // Cloudinary-hosted file (or S3 not configured) -> use Cloudinary.
    if (this.isCloudinaryUrl(url) || !this.s3Enabled || this.preferCloudinary) {
      if (!this.cloudinaryEnabled) return 'skipped';
      try {
        await cloudinary.uploader.destroy(this.cloudinaryPublicId(url));
        return 'removed successfully';
      } catch (err) {
        this.logger.error('Error while removing file from Cloudinary', err as any);
        throw new InternalServerErrorException('Failed to remove file');
      }
    }

    // S3 file
    const key = this.getKeyFromUrl(url);
    const input: DeleteObjectCommandInput = {
      Bucket: this.bucket,
      Key: key,
    };
    try {
      const response: DeleteObjectCommandOutput = await this.s3.send(
        new DeleteObjectCommand(input),
      );
      if (response.$metadata.httpStatusCode !== 204) throw '';
      return 'removed successfully';
    } catch (err) {
      throw new InternalServerErrorException('Failed to remove file');
    }
  }
}
