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
let S3Service = S3Service_1 = class S3Service {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(S3Service_1.name);
        this.preSignedUrlExpiresIn = 3600;
        this.region = configService.get('S3_REGION') || 'ap-south-1';
        this.bucket = configService.get('S3_BUCKET');
        this.baseUrl = configService.get('FILE_CDN_HOST');
        this.s3 = new client_s3_1.S3Client({
            region: this.region,
            credentials: {
                accessKeyId: configService.get('S3_ACCESS_KEY_ID'),
                secretAccessKey: configService.get('S3_SECRET_ACCESS_KEY'),
            },
        });
        this.logger.log('S3 client connected');
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
    async uploadFileSignedUrl(file, contentType, path) {
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
            this.logger.error("Error while uploading file to S3 Bucket", err);
            throw new common_1.InternalServerErrorException('Failed to save file');
        }
    }
    async listObjects(prefix = '', searchQuery) {
        const path = this.configService.get('S3_BUCKET_PUBLIC_FOLDER') + '/' + prefix;
        console.log(path);
        const input = {
            Bucket: this.bucket,
            Prefix: path,
        };
        if (searchQuery) {
            input.Prefix = prefix + searchQuery;
        }
        try {
            const response = await this.s3.send(new client_s3_1.ListObjectsV2Command(input));
            const objects = response.Contents.map((object) => object.Key);
            const totalCount = response.KeyCount || 0;
            return { objects, totalCount };
        }
        catch (err) {
            this.logger.error('Error while listing objects in S3 Bucket', err);
            throw new common_1.InternalServerErrorException('Failed to list objects');
        }
    }
    async removeFile(url) {
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