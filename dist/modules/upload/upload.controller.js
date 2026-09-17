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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const constants_1 = require("../../lib/constants");
const roles_guard_1 = require("../auth/guards/roles.guard");
const create_upload_dto_1 = require("./dto/create-upload.dto");
const file_type_validator_1 = require("./file-type.validator");
const upload_service_1 = require("./upload.service");
let UploadController = class UploadController {
    constructor(uploadService) {
        this.uploadService = uploadService;
    }
    async removeFile(url) {
        return await this.uploadService.checkAndRemoveOldFile(url);
    }
    async uploadImage(file, body) {
        if (file == null)
            throw new common_1.BadRequestException('Invalid file');
        return this.uploadService.uploadFile(body.type, file);
    }
    getFiles(filterDto) {
        return this.uploadService.getFiles(filterDto);
    }
};
exports.UploadController = UploadController;
__decorate([
    (0, common_1.Delete)(),
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'File Removed Successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.Query)('url')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "removeFile", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                type: {
                    type: 'string',
                    enum: Object.values(constants_1.FILE_TYPE),
                },
                file: {
                    type: 'string',
                    format: 'binary',
                    nullable: false,
                },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'File uploaded successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.UploadedFile)('file', (0, file_type_validator_1.ImageFileValidationBuilder)('image'))),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_upload_dto_1.UploadImageDto]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadImage", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_upload_dto_1.GetFilesListDto]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "getFiles", null);
exports.UploadController = UploadController = __decorate([
    (0, swagger_1.ApiTags)('File Upload'),
    (0, common_1.Controller)('upload'),
    __metadata("design:paramtypes", [upload_service_1.UploadService])
], UploadController);
//# sourceMappingURL=upload.controller.js.map