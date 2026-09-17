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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const jimp_1 = require("jimp");
const common_1 = require("@nestjs/common");
const services_1 = require("../../lib/shared/services");
const constants_1 = require("../../lib/constants");
let UploadService = class UploadService {
    constructor(s3Service) {
        this.s3Service = s3Service;
    }
    async uploadFile(type, file) {
        if (type === constants_1.FILE_TYPE.SCHOOL) {
            type = constants_1.FILE_TYPE.NEW_SCHOOL_IMAGES;
            file = await this.generateWaterMarkImage2(file);
        }
        const newFileName = this.s3Service.generateUniqueFileName(file.originalname);
        const destination = `${type}/${newFileName}`;
        return this.s3Service.uploadFileSignedUrl(file.buffer, file.mimetype, destination);
    }
    getFiles(data) {
        return this.s3Service.listObjects(data.prefix);
    }
    async checkAndRemoveOldFile(removeFilePath, newFilePath) {
        if (removeFilePath == null || removeFilePath == '')
            return;
        if (newFilePath != null && newFilePath === removeFilePath)
            return;
        return this.s3Service.removeFile(removeFilePath);
    }
    async removeFiles(urls) {
        if (urls == null)
            return;
        if (urls.length < 1)
            return;
        const promises = urls.map((url) => {
            if (!this.s3Service.validateUrl(url))
                return;
            return this.s3Service.removeFile(url);
        });
        await Promise.all(promises);
        return {
            message: 'Removed Successfully',
        };
    }
    async generateWaterMarkImage2(file) {
        const watermarkText = 'EdHippo Academy';
        const jimpFile = await jimp_1.default.read(file.buffer);
        try {
            const font = await jimp_1.default.loadFont(jimp_1.default.FONT_SANS_64_WHITE);
            const textWidth = jimp_1.default.measureText(font, watermarkText);
            const textImage = new jimp_1.default(jimpFile.bitmap.width, jimpFile.bitmap.height, '#ffffff00');
            textImage.print(font, (jimpFile.bitmap.width - textWidth) / 2, jimpFile.bitmap.height / 2 - 32, watermarkText);
            textImage.composite(jimpFile, 0, 0, {
                mode: jimp_1.default.BLEND_SOURCE_OVER,
                opacityDest: 1,
                opacitySource: 0.4,
            });
            const modifiedBuffer = await textImage.getBufferAsync(file.mimetype);
            file.buffer = modifiedBuffer;
            file.size = modifiedBuffer.length;
            return file;
        }
        catch (err) {
            throw err;
        }
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [services_1.S3Service])
], UploadService);
//# sourceMappingURL=upload.service.js.map