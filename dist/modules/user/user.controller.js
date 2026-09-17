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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const interceptors_1 = require("../../lib/interceptors");
const decorators_1 = require("../../lib/decorators");
const constants_1 = require("../../lib/constants");
const roles_guard_1 = require("../auth/guards/roles.guard");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const user_service_1 = require("./user.service");
const user_filter_dto_1 = require("./dto/user-filter.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    create(createUserDto) {
        createUserDto.verificationStatus = constants_1.USER_VERIFICATION_STATUS.VERIFIED;
        return this.userService.create(createUserDto);
    }
    registerSchoolUser(createDto) {
        createDto.role = constants_1.USER_ROLE.SCHOOL_ADMIN;
        createDto.verificationStatus = constants_1.USER_VERIFICATION_STATUS.PENDING;
        return this.userService.registerSchoolUser(createDto);
    }
    findAll(user, filter) {
        return this.userService.findAll(user, filter);
    }
    async getMe(user) {
        const { password, ...userDate } = user;
        return userDate;
    }
    findOne(id) {
        return this.userService.findOneById(id);
    }
    async toggleUsersVerificationStatus(toggleDto) {
        return this.userService.toggleVerificationStatus(toggleDto);
    }
    async updateUser(userId, updateUserDto) {
        return this.userService.findAndUpdate(userId, updateUserDto);
    }
    async updateProfile(user, updateUserDto) {
        return this.userService.updateProfile(user, updateUserDto);
    }
    remove(id) {
        return this.userService.remove(id);
    }
    removeProfileImage(id) {
        return this.userService.removeProfileImage(id);
    }
    async requestVerification(user, dto) {
        return this.userService.sendVerificationOtpToPhone(user, dto.phoneNumber);
    }
    async confirmVerificationForPhone(dto) {
        return this.userService.verifyPhoneAndUpdate(dto.phoneNumber, dto.otp);
    }
    async verifyPhoneFirebase(user, idToken) {
        return this.userService.verifyPhoneNumberByFireBase(user, idToken);
    }
    async requestVerificationForEmail(user, dto) {
        return this.userService.sendVerificationOtpToEmail(user, dto.mail);
    }
    async confirmVerificationForEmail(dto) {
        return this.userService.verifyMailAndUpdate(dto.mail, dto.otp);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN, constants_1.USER_ROLE.SUB_ADMIN),
    (0, swagger_1.ApiBody)({
        type: create_user_dto_1.CreateUserDto,
        description: 'Json structure of create user dto',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'User created Successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "create", null);
__decorate([
    (0, jwt_guard_1.Public)(),
    (0, common_1.Post)('school-user'),
    (0, swagger_1.ApiBody)({
        type: create_user_dto_1.SchoolUserRegistrationDto,
        description: 'Json structure of create school user dto',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'User created Successfully.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.SchoolUserRegistrationDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "registerSchoolUser", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, common_1.Get)(),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN, constants_1.USER_ROLE.SUB_ADMIN),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Users List based on applied filters.',
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, jwt_guard_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_filter_dto_1.UserFilterDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, interceptors_1.NoCache)(),
    (0, common_1.Get)('profile'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User Profile.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, jwt_guard_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getMe", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, common_1.Get)(':id'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN, constants_1.USER_ROLE.SUB_ADMIN),
    (0, swagger_1.ApiParam)({ type: String, name: 'id', description: 'User id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User detail by user id.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.Param)('id', decorators_1.ValidateMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, common_1.Put)('toggle-verification'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN, constants_1.USER_ROLE.SUB_ADMIN),
    (0, swagger_1.ApiBody)({
        type: update_user_dto_1.ToggleUsersVerificationDto,
        description: 'Json schema for admin toggle users account status',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User updated successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.ToggleUsersVerificationDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "toggleUsersVerificationStatus", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, common_1.Put)('profile/:id'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN, constants_1.USER_ROLE.SUB_ADMIN),
    (0, swagger_1.ApiParam)({ type: String, name: 'id', description: 'User id' }),
    (0, swagger_1.ApiBody)({
        type: update_user_dto_1.AdminUpdateUserDto,
        description: 'Json schema for admin updates user profile',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User updated successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.Param)('id', decorators_1.ValidateMongoId)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.AdminUpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, common_1.Put)('profile'),
    (0, swagger_1.ApiBody)({
        type: update_user_dto_1.UpdateUserDto,
        description: 'Json schema for updating profile',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User updated successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, jwt_guard_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateProfile", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiParam)({ type: String, name: 'id', description: 'User id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User deleted successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN),
    __param(0, (0, common_1.Param)('id', decorators_1.ValidateMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, common_1.Delete)(':id/profile-image'),
    (0, swagger_1.ApiParam)({ type: String, name: 'id', description: 'User id' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User Profile image updated successfully.',
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.Param)('id', decorators_1.ValidateMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "removeProfileImage", null);
__decorate([
    (0, common_1.Post)('request-verification-phone'),
    __param(0, (0, jwt_guard_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_user_dto_1.RequestVerificationDtoPhone]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "requestVerification", null);
__decorate([
    (0, common_1.Post)('confirm-verification'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.ConfirmVerificationDtoPhone]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "confirmVerificationForPhone", null);
__decorate([
    (0, common_1.Post)('verify-phone-firebase'),
    __param(0, (0, jwt_guard_1.CurrentUser)()),
    __param(1, (0, common_1.Body)('idToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "verifyPhoneFirebase", null);
__decorate([
    (0, common_1.Post)('request-verification-email'),
    __param(0, (0, jwt_guard_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_user_dto_1.RequestVerificationDtoEmail]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "requestVerificationForEmail", null);
__decorate([
    (0, common_1.Post)('confirm-verification-email'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.ConfirmVerificationDtoEmail]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "confirmVerificationForEmail", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('User'),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map