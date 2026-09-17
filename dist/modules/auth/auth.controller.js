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
exports.AuthController = void 0;
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const exceptions_1 = require("../../lib/exceptions");
const send_otp_dto_1 = require("../otp/dto/send-otp.dto");
const login_dto_1 = require("./dto/login.dto");
const jwt_guard_1 = require("./guards/jwt.guard");
const google_oauth_guard_1 = require("./guards/google-oauth.guard");
const auth_service_1 = require("./auth.service");
let AuthController = class AuthController {
    constructor(configService, authService) {
        this.configService = configService;
        this.authService = authService;
    }
    async login(body) {
        return this.authService.adminSignIn(body);
    }
    async auth() { }
    async googleAuthCallback(req, res) {
        const user = req.user;
        const { access_token } = await this.authService.userOAuthRegistration(user);
        return res.redirect(`${this.configService.get('WEBSITE_AUTH_CALLBACK_URL')}?access_token=${access_token}`);
    }
    async appGoogleVerification(accessToken) {
        return this.authService.userAuthUsingGoogleToken(accessToken);
    }
    async sendOtp(body) {
        return this.authService.sendOtpForLoginOrRegister(body);
    }
    async verifyOtpForSignup(body) {
        return await this.authService.verifyRegistrationOtp(body);
    }
    async forgotOTP(body) {
        return this.authService.sendForgotOtp(body.mail);
    }
    async verifyOtpForForgotPassword(body) {
        return await this.authService.createForgotSession(body);
    }
    async resetPassword(body) {
        return await this.authService.resetPassword(body);
    }
    async verifyToken(body) {
        return await this.authService.firebaseLogin(body);
    }
    async getUserByName(body) {
        return await this.authService.sendNameForLoginOrRegister(body);
    }
    async verifyTokenGoogle(body) {
        return await this.authService.firebaseLoginBYGooGle(body);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, jwt_guard_1.Public)(),
    (0, common_1.Post)('/login'),
    (0, swagger_1.ApiBody)({ type: login_dto_1.LoginDto, description: 'Json schema for Sign in' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Basic User info with access token.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'User not found with given credentials.',
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Invalid user password.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, jwt_guard_1.Public)(),
    (0, common_1.Get)('login/google'),
    (0, common_1.UseGuards)(google_oauth_guard_1.GoogleOauthGuard),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Redirect to Google Login page.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "auth", null);
__decorate([
    (0, jwt_guard_1.Public)(),
    (0, common_1.Get)('google-redirect'),
    (0, common_1.UseGuards)(google_oauth_guard_1.GoogleOauthGuard),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Basic User info with access token.',
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuthCallback", null);
__decorate([
    (0, jwt_guard_1.Public)(),
    (0, common_1.Get)('app-google-verification'),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Basic User info with access token.',
    }),
    __param(0, (0, common_1.Query)('access_token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "appGoogleVerification", null);
__decorate([
    (0, jwt_guard_1.Public)(),
    (0, common_1.Post)('send-otp'),
    (0, swagger_1.ApiBody)({
        type: send_otp_dto_1.SendOtpDto,
        description: 'Json schema for Registering new user',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Basic User info with access token.',
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'User already exists.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [send_otp_dto_1.SendOtpDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "sendOtp", null);
__decorate([
    (0, jwt_guard_1.Public)(),
    (0, common_1.Post)('/otp-login'),
    (0, swagger_1.ApiBody)({
        type: login_dto_1.OtpLoginDto,
        description: 'Json schema for register new user with OTP validation',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User registered successfully and provide Basic User info with access token.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'OTP Expired.',
        type: exceptions_1.OTPExpiredException,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Invalid OTP.',
        type: exceptions_1.InvalidOTPException,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.OtpLoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyOtpForSignup", null);
__decorate([
    (0, jwt_guard_1.Public)(),
    (0, common_1.Post)('/forgot-otp'),
    (0, swagger_1.ApiBody)({
        type: login_dto_1.ForgotDto,
        description: 'Json schema for requesting forgot OTP',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Forgot OTP send successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.ForgotDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotOTP", null);
__decorate([
    (0, jwt_guard_1.Public)(),
    (0, common_1.Post)('/forgot-session'),
    (0, swagger_1.ApiBody)({
        type: login_dto_1.CreateForgotSessionDto,
        description: 'Json schema for creating forgot session',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Forgot OTP verified successfully and forgot session initialize successfully.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'OTP Expired.',
        type: exceptions_1.OTPExpiredException,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Invalid OTP.',
        type: exceptions_1.InvalidOTPException,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.CreateForgotSessionDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyOtpForForgotPassword", null);
__decorate([
    (0, jwt_guard_1.Public)(),
    (0, common_1.Post)('/reset-password'),
    (0, swagger_1.ApiBody)({
        type: login_dto_1.ResetPasswordDto,
        description: 'Json schema for reset password',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'user password updated successfully.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Some verification failed, retry to create new session',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Post)('verify'),
    (0, jwt_guard_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.OtpLoginDtoFireBase]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyToken", null);
__decorate([
    (0, common_1.Post)('name-user'),
    (0, jwt_guard_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [send_otp_dto_1.SendOtpDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getUserByName", null);
__decorate([
    (0, common_1.Post)('google-firebase'),
    (0, jwt_guard_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.OtpLoginDtoFireBaseGoogle]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyTokenGoogle", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [config_1.ConfigService,
        auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map