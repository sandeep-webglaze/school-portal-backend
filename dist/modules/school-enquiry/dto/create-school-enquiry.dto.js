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
exports.CreateSchoolEnquiryDto = void 0;
const mongoose_1 = require("mongoose");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../../lib/constants");
class CreateSchoolEnquiryDto {
    constructor() {
        this.submittedAt = new Date();
    }
}
exports.CreateSchoolEnquiryDto = CreateSchoolEnquiryDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        example: 'Sam',
        description: 'parents child name',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSchoolEnquiryDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        example: 'Sam@mail.com',
        description: 'contact email',
    }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateSchoolEnquiryDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        example: '1234567890',
        description: 'contact phone number',
    }),
    (0, class_validator_1.Matches)(/^\+?[0-9\s()-]{6,20}$/, { message: 'Please enter a valid phone number' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSchoolEnquiryDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        example: new mongoose_1.Types.ObjectId(),
        description: 'id of school type for child admission',
    }),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateSchoolEnquiryDto.prototype, "schoolType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        example: new mongoose_1.Types.ObjectId(),
        description: 'id of city where parents searching for school',
    }),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateSchoolEnquiryDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        example: '12',
        description: 'class in which parents were seeking admission of their child',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSchoolEnquiryDto.prototype, "class", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        example: 'http://some-url.com',
        description: 'page url from where user filling enquiry form',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSchoolEnquiryDto.prototype, "pageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: '192.168.1.19',
        description: 'user ip from where the request is coming',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSchoolEnquiryDto.prototype, "userIp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        enum: constants_1.GENDER,
        example: constants_1.GENDER.MALE,
        description: 'Gender of child',
    }),
    (0, class_validator_1.IsEnum)(constants_1.GENDER),
    __metadata("design:type", String)
], CreateSchoolEnquiryDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        enum: constants_1.SCHOOL_ENQUIRY_STATUS,
        example: constants_1.SCHOOL_ENQUIRY_STATUS.PENDING,
        default: constants_1.SCHOOL_ENQUIRY_STATUS.PENDING,
        description: 'enquiry status',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(constants_1.SCHOOL_ENQUIRY_STATUS),
    __metadata("design:type", String)
], CreateSchoolEnquiryDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: 'hey! i want to discuss about the school near me',
        description: 'user message for school enquiry',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSchoolEnquiryDto.prototype, "message", void 0);
//# sourceMappingURL=create-school-enquiry.dto.js.map