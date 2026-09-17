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
exports.CreateAuthorDto = exports.AuthorCardDto = exports.AuthorStatDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const utils_1 = require("../../../lib/utils");
class AuthorStatDto {
}
exports.AuthorStatDto = AuthorStatDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, example: '2,000+' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthorStatDto.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, example: 'School visits' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthorStatDto.prototype, "label", void 0);
class AuthorCardDto {
}
exports.AuthorCardDto = AuthorCardDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, example: '🏫' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthorCardDto.prototype, "icon", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, example: 'Boarding Schools' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthorCardDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: 'Dehradun, Shimla, Mussoorie — top residential schools assessed personally',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthorCardDto.prototype, "description", void 0);
class CreateAuthorDto {
}
exports.CreateAuthorDto = CreateAuthorDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, example: 'Gaurav Sharma' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAuthorDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        example: 'gaurav-sharma',
        description: 'Unique slug for the public author page (/author/[slug])',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(({ value }) => (0, utils_1.slugify)(value)),
    __metadata("design:type", String)
], CreateAuthorDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: 'School Admission Expert · Education Advisor at EdHippo',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAuthorDto.prototype, "designation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: 'Profile photo URL' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAuthorDto.prototype, "photo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Short plain-text bio for the inline author box (2–4 sentences)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAuthorDto.prototype, "shortBio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Rich HTML about-me content for the dedicated author page',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAuthorDto.prototype, "fullBioHtml", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: 'Pull-quote shown on the author page' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAuthorDto.prototype, "quote", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, example: 'https://www.linkedin.com/in/gaurav-sharma' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAuthorDto.prototype, "linkedinUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: '919876543210',
        description: 'WhatsApp number in international format (digits only)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAuthorDto.prototype, "whatsappNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: [AuthorStatDto] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => AuthorStatDto),
    __metadata("design:type", Array)
], CreateAuthorDto.prototype, "stats", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: [AuthorCardDto] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => AuthorCardDto),
    __metadata("design:type", Array)
], CreateAuthorDto.prototype, "specialisations", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: [AuthorCardDto] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => AuthorCardDto),
    __metadata("design:type", Array)
], CreateAuthorDto.prototype, "credentials", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: Boolean, default: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateAuthorDto.prototype, "isActive", void 0);
//# sourceMappingURL=create-author.dto.js.map