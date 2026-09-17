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
exports.SchoolUserRegistrationDto = exports.UserRegistrationDto = exports.CreateUserDto = void 0;
const mongoose_1 = require("mongoose");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../../lib/constants");
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ required: true, example: 'Sam', description: 'name of user' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        required: true,
        example: 'Sam@mail.com',
        description: 'email of user',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "mail", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        required: true,
        example: 'Sam_Password_32!#',
        description: 'user password for further authentication',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsPhoneNumber)('IN'),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        required: true,
        example: '9222443377',
        description: 'user phone number',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(constants_1.USER_STATUS),
    (0, swagger_1.ApiProperty)({
        required: false,
        enum: constants_1.USER_STATUS,
        example: constants_1.USER_STATUS.ACTIVE,
        default: constants_1.USER_STATUS.ACTIVE,
        description: 'status of user',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(constants_1.USER_VERIFICATION_STATUS),
    (0, swagger_1.ApiProperty)({
        required: false,
        enum: constants_1.USER_VERIFICATION_STATUS,
        example: constants_1.USER_VERIFICATION_STATUS.PENDING,
        default: constants_1.USER_VERIFICATION_STATUS.PENDING,
        description: 'verification status of user account',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "verificationStatus", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(constants_1.USER_ROLE),
    (0, swagger_1.ApiProperty)({
        required: true,
        enum: constants_1.USER_ROLE,
        example: constants_1.USER_ROLE.USER,
        description: 'role of user',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: 'profile image of user' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        enum: constants_1.PLATFORMS,
        description: 'platform from where user is being registered',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(constants_1.PLATFORMS),
    __metadata("design:type", String)
], CreateUserDto.prototype, "platform", void 0);
class UserRegistrationDto extends CreateUserDto {
    constructor() {
        super(...arguments);
        this.verificationStatus = constants_1.USER_VERIFICATION_STATUS.VERIFIED;
        this.role = constants_1.USER_ROLE.USER;
    }
}
exports.UserRegistrationDto = UserRegistrationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        example: '1234',
        description: 'OTP which is sent to user contact details',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UserRegistrationDto.prototype, "otp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        enum: constants_1.USER_VERIFICATION_STATUS,
        example: constants_1.USER_VERIFICATION_STATUS.VERIFIED,
        default: constants_1.USER_VERIFICATION_STATUS.VERIFIED,
        description: 'verification status of user account',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Equals)(constants_1.USER_VERIFICATION_STATUS.VERIFIED),
    __metadata("design:type", String)
], UserRegistrationDto.prototype, "verificationStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        enum: constants_1.USER_ROLE,
        example: constants_1.USER_ROLE.USER,
        default: constants_1.USER_ROLE.USER,
        description: 'role of user',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Equals)(constants_1.USER_ROLE.USER),
    __metadata("design:type", String)
], UserRegistrationDto.prototype, "role", void 0);
class SchoolUserRegistrationDto extends CreateUserDto {
    constructor() {
        super(...arguments);
        this.verificationStatus = constants_1.USER_VERIFICATION_STATUS.PENDING;
        this.role = constants_1.USER_ROLE.SCHOOL_ADMIN;
    }
}
exports.SchoolUserRegistrationDto = SchoolUserRegistrationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        example: new mongoose_1.Types.ObjectId(),
        description: 'school id if user is school user',
    }),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], SchoolUserRegistrationDto.prototype, "school", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        enum: constants_1.USER_VERIFICATION_STATUS,
        example: constants_1.USER_VERIFICATION_STATUS.PENDING,
        default: constants_1.USER_VERIFICATION_STATUS.PENDING,
        description: 'verification status of user account',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Equals)(constants_1.USER_VERIFICATION_STATUS.PENDING),
    __metadata("design:type", String)
], SchoolUserRegistrationDto.prototype, "verificationStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        enum: constants_1.USER_ROLE,
        example: constants_1.USER_ROLE.SCHOOL_ADMIN,
        default: constants_1.USER_ROLE.SCHOOL_ADMIN,
        description: 'role of user',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Equals)(constants_1.USER_ROLE.SCHOOL_ADMIN),
    __metadata("design:type", String)
], SchoolUserRegistrationDto.prototype, "role", void 0);
//# sourceMappingURL=create-user.dto.js.map