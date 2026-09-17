import { S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@/src/config/env';
export declare class S3Service {
    private configService;
    private logger;
    private region;
    s3: S3Client;
    private bucket;
    private baseUrl;
    private preSignedUrlExpiresIn;
    constructor(configService: ConfigService<EnvironmentVariables>);
    private objectKey;
    private generateObjectUrl;
    validateUrl(url: string | URL): boolean;
    generateUniqueFileName(originalName: string): string;
    private getKeyFromUrl;
    uploadFileSignedUrl(file: Buffer, contentType: string, path: string): Promise<string>;
    listObjects(prefix?: string, searchQuery?: string): Promise<{
        objects: string[];
        totalCount: number;
    }>;
    removeFile(url: string): Promise<string>;
}
