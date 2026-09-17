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
exports.SlugFilterDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const utils_1 = require("../../../lib/utils");
const constants_1 = require("../../../lib/constants");
const shared_1 = require("../../../lib/shared");
class SlugFilterDto extends shared_1.PaginateParamDto {
}
exports.SlugFilterDto = SlugFilterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(({ value }) => (0, utils_1.slugify)(value)),
    __metadata("design:type", String)
], SlugFilterDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        return value.toString() == 'true';
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SlugFilterDto.prototype, "isHomepageSlug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, isArray: true, minimum: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ArrayUnique)(),
    (0, class_validator_1.IsMongoId)({ each: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (!Array.isArray(value))
            return [value];
        return value;
    }),
    __metadata("design:type", Array)
], SlugFilterDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, isArray: true, minimum: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ArrayUnique)(),
    (0, class_validator_1.IsMongoId)({ each: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (!Array.isArray(value))
            return [value];
        return value;
    }),
    __metadata("design:type", Array)
], SlugFilterDto.prototype, "classification", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, isArray: true, minimum: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ArrayUnique)(),
    (0, class_validator_1.IsMongoId)({ each: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (!Array.isArray(value))
            return [value];
        return value;
    }),
    __metadata("design:type", Array)
], SlugFilterDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, isArray: true, minimum: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ArrayUnique)(),
    (0, class_validator_1.IsMongoId)({ each: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (!Array.isArray(value))
            return [value];
        return value;
    }),
    __metadata("design:type", Array)
], SlugFilterDto.prototype, "schoolBoard", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], SlugFilterDto.prototype, "school", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, enum: constants_1.SLUG_TYPE }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(constants_1.SLUG_TYPE),
    __metadata("design:type", String)
], SlugFilterDto.prototype, "slugType", void 0);
//# sourceMappingURL=filter-slug.dto.js.map