import { FileValidator, HttpStatus, ParseFilePipeBuilder } from '@nestjs/common';

import { FILE_MAX_SIZE_IN_BYTES } from '@/src/lib/constants';

export interface CustomUploadTypeValidatorOptions {
    fileType: string[] | '*';
}

export const MimeTypes = {
    'image': ['image/jpg', 'image/jpeg', 'image/png', 'image/svg+xml'],
    'document': ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
}

export class CustomUploadFileTypeValidator extends FileValidator {
    _allowedMimeTypes: string[] | '*'

    constructor(protected readonly validationOptions: CustomUploadTypeValidatorOptions) {
        super(validationOptions);
        this._allowedMimeTypes = this.validationOptions.fileType;
    }

    public isValid(file?: any): boolean {
        return (this._allowedMimeTypes === '*' || this._allowedMimeTypes.includes(file.mimetype));
    }

    public buildErrorMessage(): string {
        if (this._allowedMimeTypes == '*') return 'Upload not allowed';
        return `Upload not allowed. Upload only files of type: ${this._allowedMimeTypes.join(
            ', ',
        )}`;
    }
}

export const ImageFileValidationBuilder = (allowedTypes?: keyof typeof MimeTypes) => new ParseFilePipeBuilder()
    .addValidator(new CustomUploadFileTypeValidator({ fileType: MimeTypes[allowedTypes] ?? "*" }))
    .addMaxSizeValidator({ maxSize: FILE_MAX_SIZE_IN_BYTES, message: (maxSize) => `Maximum file size allowed is ${maxSize / (1024 * 1024)} MB` })
    .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY });

export const ImageFileMulterOption = () => {
    const fileTypes = MimeTypes.image;
    return {
        fileFilter(req, file, callback) {
            if (fileTypes.includes(file.mimetype)) {
                callback(null, true);
            }
            else {
                const invalidFileErr = new Error(`Invalid file '${file.originalname}' of type ${file.mimetype} . Allowed types are - ${fileTypes}`);
                callback(invalidFileErr, false);
            }
        },
    }
}