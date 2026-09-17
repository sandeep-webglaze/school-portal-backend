import { FileValidator } from '@nestjs/common';
export interface CustomUploadTypeValidatorOptions {
    fileType: string[] | '*';
}
export declare const MimeTypes: {
    image: string[];
    document: string[];
};
export declare class CustomUploadFileTypeValidator extends FileValidator {
    protected readonly validationOptions: CustomUploadTypeValidatorOptions;
    _allowedMimeTypes: string[] | '*';
    constructor(validationOptions: CustomUploadTypeValidatorOptions);
    isValid(file?: any): boolean;
    buildErrorMessage(): string;
}
export declare const ImageFileValidationBuilder: (allowedTypes?: keyof typeof MimeTypes) => import("@nestjs/common").ParseFilePipe;
export declare const ImageFileMulterOption: () => {
    fileFilter(req: any, file: any, callback: any): void;
};
