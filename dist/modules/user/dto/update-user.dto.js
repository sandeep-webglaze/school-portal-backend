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
exports.ConfirmVerificationDtoEmail = exports.RequestVerificationDtoEmail = exports.ConfirmVerificationDtoPhone = exports.RequestVerificationDtoPhone = exports.ToggleUsersVerificationDto = exports.AdminUpdateUserDto = exports.UpdateUserDto = void 0;
const mongoose_1 = require("mongoose");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../../lib/constants");
const create_user_dto_1 = require("./create-user.dto");
class UpdateUserDto extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(create_user_dto_1.CreateUserDto, ['mail', 'phoneNumber', 'role', 'verificationStatus', 'status'])) {
}
exports.UpdateUserDto = UpdateUserDto;
class AdminUpdateUserDto extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(create_user_dto_1.CreateUserDto, ['verificationStatus'])) {
}
exports.AdminUpdateUserDto = AdminUpdateUserDto;
class ToggleUsersVerificationDto {
}
exports.ToggleUsersVerificationDto = ToggleUsersVerificationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, isArray: true, example: [new mongoose_1.Types.ObjectId()], description: "Unique list of id's of school enquiries" }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayUnique)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.IsMongoId)({ each: true }),
    __metadata("design:type", Array)
], ToggleUsersVerificationDto.prototype, "userIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, description: "verification status of user account", enum: constants_1.USER_VERIFICATION_STATUS, }),
    (0, class_validator_1.IsEnum)(constants_1.USER_VERIFICATION_STATUS),
    __metadata("design:type", String)
], ToggleUsersVerificationDto.prototype, "verificationStatus", void 0);
class RequestVerificationDtoPhone {
}
exports.RequestVerificationDtoPhone = RequestVerificationDtoPhone;
__decorate([
    (0, class_validator_1.Matches)(/^\+?[0-9\s()-]{6,20}$/, { message: 'Please enter a valid phone number' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        required: true,
        example: '9222443377',
        description: 'user phone number',
    }),
    __metadata("design:type", String)
], RequestVerificationDtoPhone.prototype, "phoneNumber", void 0);
class ConfirmVerificationDtoPhone extends RequestVerificationDtoPhone {
}
exports.ConfirmVerificationDtoPhone = ConfirmVerificationDtoPhone;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        example: '1234',
        description: 'OTP which is sent to user contact details',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ConfirmVerificationDtoPhone.prototype, "otp", void 0);
class RequestVerificationDtoEmail {
}
exports.RequestVerificationDtoEmail = RequestVerificationDtoEmail;
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        required: true,
        example: 'Sam@mail.com',
        description: 'email of user',
    }),
    __metadata("design:type", String)
], RequestVerificationDtoEmail.prototype, "mail", void 0);
class ConfirmVerificationDtoEmail extends RequestVerificationDtoEmail {
}
exports.ConfirmVerificationDtoEmail = ConfirmVerificationDtoEmail;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        example: '1234',
        description: 'OTP which is sent to user contact details',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ConfirmVerificationDtoEmail.prototype, "otp", void 0);
//# sourceMappingURL=update-user.dto.js.map