import { GetFilesListDto, UploadImageDto } from './dto/create-upload.dto';
import { UploadService } from './upload.service';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    removeFile(url: string): Promise<"skipped" | "removed successfully">;
    uploadImage(file: Express.Multer.File, body: UploadImageDto): Promise<string>;
    getFiles(filterDto: GetFilesListDto): Promise<{
        objects: string[];
        totalCount: number;
    }>;
}
