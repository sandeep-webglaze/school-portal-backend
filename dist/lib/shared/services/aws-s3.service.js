"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var S3Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Service = void 0;
const common_1 = require("@nestjs/common");
const client_s3_1 = require("@aws-sdk/client-s3");
const config_1 = require("@nestjs/config");
const cloudinary_1 = require("cloudinary");
let S3Service = S3Service_1 = class S3Service {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(S3Service_1.name);
        this.preSignedUrlExpiresIn = 3600;
        this.s3Enabled = false;
        this.cloudinaryEnabled = false;
        this.preferCloudinary = false;
        this.region = configService.get('S3_REGION') || 'ap-south-1';
        this.bucket = configService.get('S3_BUCKET');
        this.baseUrl = configService.get('FILE_CDN_HOST');
        const accessKeyId = configService.get('S3_ACCESS_KEY_ID');
        const secretAccessKey = configService.get('S3_SECRET_ACCESS_KEY');
        this.s3Enabled = Boolean(accessKeyId && secretAccessKey && this.bucket);
        if (this.s3Enabled) {
            this.s3 = new client_s3_1.S3Client({
                region: this.region,
                credentials: { accessKeyId, secretAccessKey },
            });
            this.logger.log('S3 client connected (primary storage)');
        }
        else {
            this.logger.warn('S3 keys not set — will use Cloudinary fallback if configured');
        }
        const cloudName = configService.get('CLOUDINARY_CLOUD_NAME');
        const apiKey = configService.get('CLOUDINARY_API_KEY');
        const apiSecret = configService.get('CLOUDINARY_API_SECRET');
        this.cloudinaryEnabled = Boolean(cloudName && apiKey && apiSecret);
        if (this.cloudinaryEnabled) {
            cloudinary_1.v2.config({
                cloud_name: cloudName,
                api_key: apiKey,
                api_secret: apiSecret,
                secure: true,
            });
            this.logger.log(this.s3Enabled
                ? 'Cloudinary configured (fallback)'
                : 'Cloudinary configured (primary storage)');
        }
        const provider = (configService.get('STORAGE_PROVIDER') || '').toLowerCase();
        this.preferCloudinary = provider === 'cloudinary' && this.cloudinaryEnabled;
        if (provider === 's3' && !this.s3Enabled) {
            this.logger.warn('STORAGE_PROVIDER=s3 but S3 keys are missing');
        }
        if (provider === 'cloudinary' && !this.cloudinaryEnabled) {
            this.logger.warn('STORAGE_PROVIDER=cloudinary but Cloudinary keys are missing');
        }
        this.logger.log(`Active image storage: ${this.preferCloudinary ? 'Cloudinary' : this.s3Enabled ? 'S3' : this.cloudinaryEnabled ? 'Cloudinary' : 'NONE'}`);
        if (!this.s3Enabled && !this.cloudinaryEnabled) {
            this.logger.error('No image storage configured — set S3 or Cloudinary keys');
        }
    }
    objectKey(path) {
        return (this.configService.get('S3_BUCKET_PUBLIC_FOLDER') + '/' + path);
    }
    generateObjectUrl(key) {
        return `${this.baseUrl}/${key}`;
    }
    validateUrl(url) {
        try {
            if (url === "")
                return false;
            new URL(url);
            return true;
        }
        catch (err) {
            return false;
        }
    }
    generateUniqueFileName(originalName) {
        const fileNameWithoutExtension = originalName.substring(0, originalName.lastIndexOf('.')).replace(/[^a-zA-Z0-9]/g, '_');
        const fileExtension = originalName.substring(originalName.lastIndexOf('.') + 1);
        const epochTime = Date.now().toString();
        return `${fileNameWithoutExtension}_${epochTime}.${fileExtension}`;
    }
    getKeyFromUrl(url) {
        if (!this.validateUrl(url))
            return url;
        const Url = new URL(url);
        return Url.pathname.slice(1);
    }
    isCloudinaryUrl(url) {
        return typeof url === 'string' && url.includes('res.cloudinary.com');
    }
    uploadToCloudinary(file, path) {
        const publicFolder = this.configService.get('S3_BUCKET_PUBLIC_FOLDER') || 'uploads';
        const lastSlash = path.lastIndexOf('/');
        const dir = lastSlash >= 0 ? path.slice(0, lastSlash) : '';
        const fileName = lastSlash >= 0 ? path.slice(lastSlash + 1) : path;
        const dotIdx = fileName.lastIndexOf('.');
        const publicId = dotIdx > 0 ? fileName.substring(0, dotIdx) : fileName;
        const folder = dir ? `${publicFolder}/${dir}` : publicFolder;
        return new Promise((resolve, reject) => {
            const stream = cloudinary_1.v2.uploader.upload_stream({ folder, public_id: publicId, resource_type: 'auto', overwrite: true }, (err, result) => {
                if (err || !result) {
                    this.logger.error('Cloudinary upload failed', err);
                    return reject(new common_1.InternalServerErrorException('Failed to save file'));
                }
                resolve(result.secure_url);
            });
            stream.end(file);
        });
    }
    cloudinaryPublicId(url) {
        try {
            const u = new URL(url);
            const parts = u.pathname.split('/');
            const uploadIdx = parts.findIndex((p) => p === 'upload');
            let rest = uploadIdx >= 0 ? parts.slice(uploadIdx + 1) : parts;
            if (rest[0] && /^v\d+$/.test(rest[0]))
                rest = rest.slice(1);
            const last = rest[rest.length - 1] ?? '';
            const dot = last.lastIndexOf('.');
            rest[rest.length - 1] = dot > 0 ? last.substring(0, dot) : last;
            return rest.join('/');
        }
        catch {
            return url;
        }
    }
    async listCloudinary(prefix) {
        if (!this.cloudinaryEnabled)
            return { objects: [], totalCount: 0 };
        const publicFolder = this.configService.get('S3_BUCKET_PUBLIC_FOLDER') || 'uploads';
        const full = prefix ? `${publicFolder}/${prefix}` : publicFolder;
        try {
            const res = await cloudinary_1.v2.api.resources({
                type: 'upload',
                prefix: full,
                max_results: 500,
            });
            const objects = (res.resources || []).map((r) => r.secure_url);
            return { objects, totalCount: res.total_count ?? objects.length };
        }
        catch (err) {
            this.logger.error('Error listing Cloudinary resources', err);
            return { objects: [], totalCount: 0 };
        }
    }
    async uploadFileSignedUrl(file, contentType, path) {
        if (this.s3Enabled && !this.preferCloudinary) {
            const Key = this.objectKey(path);
            const input = new client_s3_1.PutObjectCommand({
                Body: file,
                Bucket: this.bucket,
                Key: Key,
                ContentType: contentType,
            });
            try {
                const response = await this.s3.send(input);
                if (response.$metadata.httpStatusCode !== 200)
                    throw '';
                return this.generateObjectUrl(Key);
            }
            catch (err) {
                this.logger.error('Error while uploading file to S3 Bucket', err);
                if (this.cloudinaryEnabled) {
                    this.logger.warn('Falling back to Cloudinary for this upload');
                    return this.uploadToCloudinary(file, path);
                }
                throw new common_1.InternalServerErrorException('Failed to save file');
            }
        }
        if (this.cloudinaryEnabled) {
            return this.uploadToCloudinary(file, path);
        }
        throw new common_1.InternalServerErrorException('No image storage is configured');
    }
    async listObjects(prefix = '', searchQuery) {
        if (!this.s3Enabled || this.preferCloudinary) {
            return this.listCloudinary(prefix);
        }
        const path = this.configService.get('S3_BUCKET_PUBLIC_FOLDER') + '/' + prefix;
        const input = {
            Bucket: this.bucket,
            Prefix: path,
        };
        if (searchQuery) {
            input.Prefix = prefix + searchQuery;
        }
        try {
            const response = await this.s3.send(new client_s3_1.ListObjectsV2Command(input));
            const objects = (response.Contents ?? []).map((object) => object.Key);
            const totalCount = response.KeyCount || 0;
            return { objects, totalCount };
        }
        catch (err) {
            this.logger.error('Error while listing objects in S3 Bucket', err);
            throw new common_1.InternalServerErrorException('Failed to list objects');
        }
    }
    async removeFile(url) {
        if (this.isCloudinaryUrl(url) || !this.s3Enabled || this.preferCloudinary) {
            if (!this.cloudinaryEnabled)
                return 'skipped';
            try {
                await cloudinary_1.v2.uploader.destroy(this.cloudinaryPublicId(url));
                return 'removed successfully';
            }
            catch (err) {
                this.logger.error('Error while removing file from Cloudinary', err);
                throw new common_1.InternalServerErrorException('Failed to remove file');
            }
        }
        const key = this.getKeyFromUrl(url);
        const input = {
            Bucket: this.bucket,
            Key: key,
        };
        try {
            const response = await this.s3.send(new client_s3_1.DeleteObjectCommand(input));
            if (response.$metadata.httpStatusCode !== 204)
                throw '';
            return 'removed successfully';
        }
        catch (err) {
            throw new common_1.InternalServerErrorException('Failed to remove file');
        }
    }
};
exports.S3Service = S3Service;
exports.S3Service = S3Service = S3Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], S3Service);
//# sourceMappingURL=aws-s3.service.js.map