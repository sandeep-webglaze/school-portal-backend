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
exports.CreateAppConfigurationDto = exports.SocialMediaLinkDto = exports.ContactUsDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const create_slug_dto_1 = require("../../slug/dto/create-slug.dto");
class ContactUsDto {
}
exports.ContactUsDto = ContactUsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, example: "1212121212", description: "Phone number for contact us" }),
    (0, class_validator_1.IsPhoneNumber)('IN'),
    __metadata("design:type", String)
], ContactUsDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, example: "contact@mail.com", description: "Contact us mail" }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], ContactUsDto.prototype, "mail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, example: "street no.1, new york,", description: "Contacting address" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 500),
    __metadata("design:type", String)
], ContactUsDto.prototype, "address", void 0);
class SocialMediaLinkDto {
}
exports.SocialMediaLinkDto = SocialMediaLinkDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, example: "http://facebook.com/my-facebook-profile", description: "Link of the facebook profile" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], SocialMediaLinkDto.prototype, "facebook", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, example: "http://instagram.com/my-instagram-profile", description: "Link of the instagram profile" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], SocialMediaLinkDto.prototype, "intstagram", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, example: "http://tweeter.com/my-tweeter-profile", description: "Link of the tweeter profile" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], SocialMediaLinkDto.prototype, "tweeter", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, example: "http://linkedin.com/my-linkedin-profile", description: "Link of the linkedin profile" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], SocialMediaLinkDto.prototype, "linkedIn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, example: "http://youtube.com/my-youtube-profile", description: "Link of the youtube page" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], SocialMediaLinkDto.prototype, "youtube", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, example: "http://pinterest.com/my-pinterest-profile", description: "Link of the pinterest portfolio" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], SocialMediaLinkDto.prototype, "pinterest", void 0);
class CreateAppConfigurationDto {
}
exports.CreateAppConfigurationDto = CreateAppConfigurationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: ContactUsDto, description: "Object for contact us detail" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ContactUsDto),
    __metadata("design:type", ContactUsDto)
], CreateAppConfigurationDto.prototype, "contactUs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: "Terms and conditions for the platform" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAppConfigurationDto.prototype, "termsAndConditions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: "Privacy policies for the platform" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAppConfigurationDto.prototype, "privacyPolicy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: "Refund policies for the platform" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAppConfigurationDto.prototype, "refundPolicy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: "About us for the platform" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAppConfigurationDto.prototype, "aboutUs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: "Json string for SEO related data" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAppConfigurationDto.prototype, "defaultSlugJsonSchema", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: "string for SEO related data" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAppConfigurationDto.prototype, "robots", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: SocialMediaLinkDto, description: "Object for Social media links" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => SocialMediaLinkDto),
    __metadata("design:type", SocialMediaLinkDto)
], CreateAppConfigurationDto.prototype, "socialMedia", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: create_slug_dto_1.SlugMetaDataDto, description: "Object for SEO and meta data of the slug" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => create_slug_dto_1.SlugMetaDataDto),
    __metadata("design:type", create_slug_dto_1.SlugMetaDataDto)
], CreateAppConfigurationDto.prototype, "defaultSlugMetaData", void 0);
//# sourceMappingURL=create-app-configuration.dto.js.map