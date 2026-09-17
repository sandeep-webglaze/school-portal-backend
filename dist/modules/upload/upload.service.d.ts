import { S3Service } from '@/src/lib/shared/services';
import { FILE_TYPE } from '@/src/lib/constants';
import { GetFilesListDto } from './dto/create-upload.dto';
export declare class UploadService {
    private readonly s3Service;
    constructor(s3Service: S3Service);
    uploadFile(type: FILE_TYPE, file: Express.Multer.File): Promise<string>;
    getFiles(data: GetFilesListDto): Promise<{
        objects: string[];
        totalCount: number;
    }>;
    checkAndRemoveOldFile(removeFilePath?: string, newFilePath?: string): Promise<string>;
    removeFiles(urls?: string[]): Promise<{
        message: string;
    }>;
    private generateWaterMarkImage2;
}
