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
exports.OtpLoginDtoFireBaseGoogle = exports.OtpLoginDtoFireBase = exports.OtpLoginDto = exports.ResetPasswordDto = exports.CreateForgotSessionDto = exports.ForgotDto = exports.LoginDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const create_user_dto_1 = require("../../user/dto/create-user.dto");
class LoginDto extends (0, swagger_1.PickType)(create_user_dto_1.CreateUserDto, ['mail']) {
}
exports.LoginDto = LoginDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        required: true,
        example: 'Sam_Password_32!#',
        description: 'user password for further authentication',
    }),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
class ForgotDto extends (0, swagger_1.PickType)(create_user_dto_1.CreateUserDto, ['mail']) {
}
exports.ForgotDto = ForgotDto;
class CreateForgotSessionDto extends (0, swagger_1.PickType)(create_user_dto_1.UserRegistrationDto, [
    'mail',
    'otp',
]) {
}
exports.CreateForgotSessionDto = CreateForgotSessionDto;
class ResetPasswordDto extends (0, swagger_1.PickType)(create_user_dto_1.CreateUserDto, ['password']) {
}
exports.ResetPasswordDto = ResetPasswordDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "token", void 0);
class OtpLoginDto extends (0, swagger_1.PickType)(create_user_dto_1.UserRegistrationDto, [
    'name',
    'phoneNumber',
    'otp',
    'role',
    'verificationStatus',
]) {
}
exports.OtpLoginDto = OtpLoginDto;
class OtpLoginDtoFireBase extends (0, swagger_1.PickType)(create_user_dto_1.UserRegistrationDto, [
    'name',
    'phoneNumber',
    'role',
    'verificationStatus',
]) {
}
exports.OtpLoginDtoFireBase = OtpLoginDtoFireBase;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'firebase_token',
        description: 'Firebase token for authentication',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OtpLoginDtoFireBase.prototype, "idToken", void 0);
class OtpLoginDtoFireBaseGoogle extends (0, swagger_1.PickType)(create_user_dto_1.UserRegistrationDto, [
    'name',
    'mail',
    'imageUrl',
    'role',
    'verificationStatus',
]) {
}
exports.OtpLoginDtoFireBaseGoogle = OtpLoginDtoFireBaseGoogle;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'firebase_token',
        description: 'Firebase token for authentication',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OtpLoginDtoFireBaseGoogle.prototype, "idToken", void 0);
//# sourceMappingURL=login.dto.js.map