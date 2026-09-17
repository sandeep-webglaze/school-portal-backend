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
exports.GetFilesListDto = exports.UploadImageDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../../lib/constants");
class UploadImageDto {
}
exports.UploadImageDto = UploadImageDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, enum: constants_1.FILE_TYPE, description: "Category of File" }),
    (0, class_validator_1.IsEnum)(constants_1.FILE_TYPE),
    __metadata("design:type", String)
], UploadImageDto.prototype, "type", void 0);
class GetFilesListDto {
}
exports.GetFilesListDto = GetFilesListDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, enum: constants_1.FILE_TYPE }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(constants_1.FILE_TYPE),
    __metadata("design:type", String)
], GetFilesListDto.prototype, "prefix", void 0);
//# sourceMappingURL=create-upload.dto.js.map