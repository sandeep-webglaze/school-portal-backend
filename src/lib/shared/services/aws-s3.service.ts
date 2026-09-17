import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { S3Client, PutObjectCommand, DeleteObjectCommandInput, DeleteObjectCommand, DeleteObjectCommandOutput, PutObjectCommandOutput, ListObjectsV2CommandInput, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@/src/config/env';

@Injectable()
export class S3Service {
  private logger = new Logger(S3Service.name);
  private region: string;
  s3: S3Client;
  private bucket: string;
  private baseUrl: string;
  private preSignedUrlExpiresIn: number = 3600;

  constructor(private configService: ConfigService<EnvironmentVariables>) {
    this.region = configService.get<string>('S3_REGION') || 'ap-south-1'; // default to MUMBAI, IN
    this.bucket = configService.get<string>('S3_BUCKET');
    this.baseUrl = configService.get<string>('FILE_CDN_HOST');
    this.s3 = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: configService.get<string>('S3_ACCESS_KEY_ID'),
        secretAccessKey: configService.get<string>('S3_SECRET_ACCESS_KEY'),
      },
    });
    this.logger.log('S3 client connected');
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

  async uploadFileSignedUrl(file: Buffer, contentType: string, path: string) {
    const Key = this.objectKey(path);

    const input: PutObjectCommand = new PutObjectCommand({
      Body: file,
      Bucket: this.bucket,
      Key: Key,
      ContentType: contentType,
    });

    try {
      // const presignedUrl = await getSignedUrl(this.s3, input, { expiresIn: this.preSignedUrlExpiresIn })
      const response: PutObjectCommandOutput = await this.s3.send(input);

      if (response.$metadata.httpStatusCode !== 200) throw '';

      return this.generateObjectUrl(Key);
    } catch (err) {
      this.logger.error("Error while uploading file to S3 Bucket", err);
      throw new InternalServerErrorException('Failed to save file');
    }
  }

  async listObjects(
    prefix: string = '',
    searchQuery?: string
  ): Promise<{ objects: string[]; totalCount: number }> {
    const path = this.configService.get<string>('S3_BUCKET_PUBLIC_FOLDER') + '/' + prefix;
    console.log(path);

    const input: ListObjectsV2CommandInput = {
      Bucket: this.bucket,
      Prefix: path,
    };

    if (searchQuery) {
      input.Prefix = prefix + searchQuery; // Update the prefix to include the search query
    }
    try {
      const response = await this.s3.send(new ListObjectsV2Command(input));
      const objects = response.Contents.map((object) => object.Key);
      const totalCount = response.KeyCount || 0;

      // Apply pagination
      // const startIndex = (page - 1) * pageSize;
      // const paginatedObjects = objects.slice(startIndex, startIndex + pageSize);

      return { objects, totalCount };
    } catch (err) {
      this.logger.error('Error while listing objects in S3 Bucket', err);
      throw new InternalServerErrorException('Failed to list objects');
    }
  }

  async removeFile(url: string) {
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
