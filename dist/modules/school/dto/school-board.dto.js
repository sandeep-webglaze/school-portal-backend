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
exports.SchoolBoardFilterDto = exports.UpdateSchoolBoardDto = exports.CreateSchoolBoardDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const shared_1 = require("../../../lib/shared");
class CreateSchoolBoardDto {
}
exports.CreateSchoolBoardDto = CreateSchoolBoardDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, description: "Board name" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSchoolBoardDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: Boolean, default: false, description: "Featured flag for school board" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateSchoolBoardDto.prototype, "featured", void 0);
class UpdateSchoolBoardDto extends (0, swagger_1.PartialType)(CreateSchoolBoardDto) {
}
exports.UpdateSchoolBoardDto = UpdateSchoolBoardDto;
class SchoolBoardFilterDto extends shared_1.PaginateParamDto {
}
exports.SchoolBoardFilterDto = SchoolBoardFilterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SchoolBoardFilterDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        return value.toString() == 'true';
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SchoolBoardFilterDto.prototype, "featured", void 0);
//# sourceMappingURL=school-board.dto.js.map