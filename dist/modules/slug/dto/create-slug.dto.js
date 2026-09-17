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
exports.CreateSlugDto = exports.SlugFaqDto = exports.SlugSchoolFilterDto = exports.SlugMetaDataDto = void 0;
const mongoose_1 = require("mongoose");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const utils_1 = require("../../../lib/utils");
const constants_1 = require("../../../lib/constants");
class SlugMetaRobotsDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SlugMetaRobotsDto.prototype, "index", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SlugMetaRobotsDto.prototype, "follow", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SlugMetaRobotsDto.prototype, "noarchive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SlugMetaRobotsDto.prototype, "nosnippet", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SlugMetaRobotsDto.prototype, "noimageindex", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SlugMetaRobotsDto.prototype, "nocache", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SlugMetaRobotsDto.prototype, "notranslate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SlugMetaRobotsDto.prototype, "indexifembedded", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SlugMetaRobotsDto.prototype, "nositelinkssearchbox", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SlugMetaRobotsDto.prototype, "unavailable_after", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SlugMetaRobotsDto.prototype, "max-video-preview", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SlugMetaRobotsDto.prototype, "max-image-preview", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: Number }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SlugMetaRobotsDto.prototype, "max-snippet", void 0);
class SlugMetaOpenGraphDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SlugMetaOpenGraphDto.prototype, "locale", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SlugMetaOpenGraphDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SlugMetaOpenGraphDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SlugMetaOpenGraphDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SlugMetaOpenGraphDto.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SlugMetaOpenGraphDto.prototype, "images", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SlugMetaOpenGraphDto.prototype, "siteName", void 0);
class SlugMetaTweeterDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SlugMetaTweeterDto.prototype, "card", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SlugMetaTweeterDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SlugMetaTweeterDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SlugMetaTweeterDto.prototype, "site", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SlugMetaTweeterDto.prototype, "images", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SlugMetaTweeterDto.prototype, "creator", void 0);
class SlugMetaDataDto {
}
exports.SlugMetaDataDto = SlugMetaDataDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SlugMetaDataDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SlugMetaDataDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Comma-separated SEO keywords for this slug page',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SlugMetaDataDto.prototype, "keywords", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: SlugMetaRobotsDto }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => SlugMetaRobotsDto),
    __metadata("design:type", SlugMetaRobotsDto)
], SlugMetaDataDto.prototype, "robots", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: SlugMetaOpenGraphDto }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => SlugMetaOpenGraphDto),
    __metadata("design:type", SlugMetaOpenGraphDto)
], SlugMetaDataDto.prototype, "openGraph", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: SlugMetaTweeterDto }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => SlugMetaTweeterDto),
    __metadata("design:type", SlugMetaTweeterDto)
], SlugMetaDataDto.prototype, "twitter", void 0);
class SlugSchoolFilterDto {
}
exports.SlugSchoolFilterDto = SlugSchoolFilterDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: new mongoose_1.Types.ObjectId(),
        description: 'id of classification',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], SlugSchoolFilterDto.prototype, "classification", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: new mongoose_1.Types.ObjectId(),
        description: 'id of school board',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], SlugSchoolFilterDto.prototype, "schoolBoard", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: new mongoose_1.Types.ObjectId(),
        description: 'id of school type',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], SlugSchoolFilterDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: new mongoose_1.Types.ObjectId(),
        description: 'id of city',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], SlugSchoolFilterDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: new mongoose_1.Types.ObjectId(),
        description: 'id of school',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], SlugSchoolFilterDto.prototype, "school", void 0);
class SlugFaqDto {
}
exports.SlugFaqDto = SlugFaqDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, description: 'FAQ question' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SlugFaqDto.prototype, "question", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, description: 'FAQ answer' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SlugFaqDto.prototype, "answer", void 0);
class CreateSlugDto {
}
exports.CreateSlugDto = CreateSlugDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: SlugMetaDataDto }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => SlugMetaDataDto),
    __metadata("design:type", SlugMetaDataDto)
], CreateSlugDto.prototype, "slugMetaData", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSlugDto.prototype, "slugJsonSchema", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSlugDto.prototype, "slugContent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, example: 'some unique slug text' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(({ value }) => (0, utils_1.slugify)(value)),
    __metadata("design:type", String)
], CreateSlugDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: 'text which is short description of slug',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSlugDto.prototype, "formattedText", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: Boolean,
        default: false,
        description: 'homepage flag for slug',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateSlugDto.prototype, "isHomepageSlug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: SlugSchoolFilterDto,
        description: 'filter for which slug is created',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsObject)(),
    (0, class_transformer_1.Type)(() => SlugSchoolFilterDto),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", SlugSchoolFilterDto)
], CreateSlugDto.prototype, "filters", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        default: constants_1.SLUG_TYPE.COMBINATION,
        enum: constants_1.SLUG_TYPE,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(constants_1.SLUG_TYPE),
    __metadata("design:type", String)
], CreateSlugDto.prototype, "slugType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'On-page H1 heading for the search landing page',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSlugDto.prototype, "heroTitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Sub-heading shown beneath the hero H1',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSlugDto.prototype, "heroSubtitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Banner image URL used as the search page hero background',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSlugDto.prototype, "heroImage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: [SlugFaqDto],
        description: 'Admin-managed FAQ list for the search landing page',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => SlugFaqDto),
    __metadata("design:type", Array)
], CreateSlugDto.prototype, "faqs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: new mongoose_1.Types.ObjectId(),
        nullable: true,
        description: 'id of the assigned author — send null to un-assign',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)((o) => o.author !== null && o.author !== ''),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateSlugDto.prototype, "author", void 0);
//# sourceMappingURL=create-slug.dto.js.map