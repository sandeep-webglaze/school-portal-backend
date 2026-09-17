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
exports.SchoolEnquiryFilterDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../../lib/constants");
const shared_1 = require("../../../lib/shared");
class SchoolEnquiryFilterDto extends shared_1.PaginateParamDto {
}
exports.SchoolEnquiryFilterDto = SchoolEnquiryFilterDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'name of user which request enquiry',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SchoolEnquiryFilterDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: 'email of user' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], SchoolEnquiryFilterDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, isArray: true, minimum: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], SchoolEnquiryFilterDto.prototype, "schoolType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], SchoolEnquiryFilterDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, enum: constants_1.GENDER }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(constants_1.GENDER),
    __metadata("design:type", String)
], SchoolEnquiryFilterDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, enum: constants_1.SCHOOL_ENQUIRY_STATUS }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(constants_1.SCHOOL_ENQUIRY_STATUS),
    __metadata("design:type", String)
], SchoolEnquiryFilterDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: 'user ip' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SchoolEnquiryFilterDto.prototype, "userIp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: 'some page url' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SchoolEnquiryFilterDto.prototype, "pageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)({ strictSeparator: true }),
    __metadata("design:type", Date)
], SchoolEnquiryFilterDto.prototype, "submittedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, enum: constants_1.PLATFORMS }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(constants_1.PLATFORMS),
    __metadata("design:type", String)
], SchoolEnquiryFilterDto.prototype, "platform", void 0);
//# sourceMappingURL=school-enquiry-filter.dto.js.map