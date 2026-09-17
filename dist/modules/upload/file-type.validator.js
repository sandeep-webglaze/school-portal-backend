"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageFileMulterOption = exports.ImageFileValidationBuilder = exports.CustomUploadFileTypeValidator = exports.MimeTypes = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../lib/constants");
exports.MimeTypes = {
    'image': ['image/jpg', 'image/jpeg', 'image/png', 'image/svg+xml'],
    'document': ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
};
class CustomUploadFileTypeValidator extends common_1.FileValidator {
    constructor(validationOptions) {
        super(validationOptions);
        this.validationOptions = validationOptions;
        this._allowedMimeTypes = this.validationOptions.fileType;
    }
    isValid(file) {
        return (this._allowedMimeTypes === '*' || this._allowedMimeTypes.includes(file.mimetype));
    }
    buildErrorMessage() {
        if (this._allowedMimeTypes == '*')
            return 'Upload not allowed';
        return `Upload not allowed. Upload only files of type: ${this._allowedMimeTypes.join(', ')}`;
    }
}
exports.CustomUploadFileTypeValidator = CustomUploadFileTypeValidator;
const ImageFileValidationBuilder = (allowedTypes) => new common_1.ParseFilePipeBuilder()
    .addValidator(new CustomUploadFileTypeValidator({ fileType: exports.MimeTypes[allowedTypes] ?? "*" }))
    .addMaxSizeValidator({ maxSize: constants_1.FILE_MAX_SIZE_IN_BYTES, message: (maxSize) => `Maximum file size allowed is ${maxSize / (1024 * 1024)} MB` })
    .build({ errorHttpStatusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY });
exports.ImageFileValidationBuilder = ImageFileValidationBuilder;
const ImageFileMulterOption = () => {
    const fileTypes = exports.MimeTypes.image;
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
    };
};
exports.ImageFileMulterOption = ImageFileMulterOption;
//# sourceMappingURL=file-type.validator.js.map