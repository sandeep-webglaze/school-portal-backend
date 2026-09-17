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
exports.SchoolFilterDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const shared_1 = require("../../../lib/shared");
const constants_1 = require("../../../lib/constants");
class SchoolSortBy {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, enum: constants_1.SORTING_TYPE, description: "sort schools by maximum fees" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(constants_1.SORTING_TYPE),
    __metadata("design:type", String)
], SchoolSortBy.prototype, "maxFees", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, enum: constants_1.SORTING_TYPE, description: "sort schools by minimum fees" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(constants_1.SORTING_TYPE),
    __metadata("design:type", String)
], SchoolSortBy.prototype, "minFees", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, enum: constants_1.SORTING_TYPE, description: "sort schools by average ratings" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(constants_1.SORTING_TYPE),
    __metadata("design:type", String)
], SchoolSortBy.prototype, "avgRating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, enum: constants_1.SORTING_TYPE, description: "sort schools by their created at date" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(constants_1.SORTING_TYPE),
    __metadata("design:type", String)
], SchoolSortBy.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, enum: constants_1.SORTING_TYPE, description: "sort schools such that featured followed by non featured" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(constants_1.SORTING_TYPE),
    __metadata("design:type", String)
], SchoolSortBy.prototype, "isFeatured", void 0);
class SchoolFilterDto extends shared_1.PaginateParamDto {
}
exports.SchoolFilterDto = SchoolFilterDto;
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
], SchoolFilterDto.prototype, "includeId", void 0);
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
], SchoolFilterDto.prototype, "excludeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: "user id if for wish listed school flag" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], SchoolFilterDto.prototype, "userId", void 0);
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
], SchoolFilterDto.prototype, "classification", void 0);
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
], SchoolFilterDto.prototype, "type", void 0);
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
], SchoolFilterDto.prototype, "schoolBoards", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: Number, minimum: 1, example: 1200 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], SchoolFilterDto.prototype, "minFees", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: Number, minimum: 1, example: 1400 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], SchoolFilterDto.prototype, "maxFees", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SchoolFilterDto.prototype, "categorySlug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        return value.toString() == 'true';
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SchoolFilterDto.prototype, "isFeatured", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: Boolean, default: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        return value.toString() == 'true';
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SchoolFilterDto.prototype, "published", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], SchoolFilterDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SchoolFilterDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: SchoolSortBy }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => SchoolSortBy),
    __metadata("design:type", SchoolSortBy)
], SchoolFilterDto.prototype, "sortBy", void 0);
//# sourceMappingURL=school-filter.dto.js.map