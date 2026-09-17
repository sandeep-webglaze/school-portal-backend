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
exports.CreateLeadDto = void 0;
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../../lib/constants");
class CreateLeadDto {
    static create_lead_from_enquiry(enquiry) {
        const lead = new CreateLeadDto();
        lead.name = enquiry.name;
        lead.email = enquiry.email;
        lead.phoneNumber = enquiry.phoneNumber;
        lead.class = enquiry.class;
        lead.schoolType = enquiry.schoolType.toString();
        lead.city = enquiry.city.toString();
        lead.gender = enquiry.gender;
        lead.message = enquiry.message;
        lead.generatedAt = enquiry.submittedAt;
        return lead;
    }
}
exports.CreateLeadDto = CreateLeadDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, example: "Sam", description: "parents child name" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, example: "Sam@mail.com", description: "contact email" }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, example: "1234567890", description: "contact phone number" }),
    (0, class_validator_1.IsPhoneNumber)('IN'),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, example: new mongoose_1.Types.ObjectId(), description: "id of school type for child admission" }),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "schoolType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, example: new mongoose_1.Types.ObjectId(), description: "id of city where parents searching for school" }),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, example: "12", description: "class in which parents were seeking admission of their child" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "class", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(constants_1.GENDER),
    (0, swagger_1.ApiProperty)({ required: true, enum: constants_1.GENDER, example: constants_1.GENDER.MALE, description: "Gender of child" }),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, example: "hey! i want to discuss about the school near me", description: "user message for school enquiry" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, example: 10000, description: "Actual price of lead, this will be calculated if not give" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateLeadDto.prototype, "actualPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, example: 10000, description: "Visible price to user,on creation this will be override by actual price" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateLeadDto.prototype, "currentPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, example: new Date(), description: "Date when got the lead, default to current time" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)({ strictSeparator: true }),
    __metadata("design:type", Date)
], CreateLeadDto.prototype, "generatedAt", void 0);
//# sourceMappingURL=create-lead.dto.js.map