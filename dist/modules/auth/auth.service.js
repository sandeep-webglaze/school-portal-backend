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
exports.AuthService = void 0;
const axios_1 = require("axios");
const common_1 = require("@nestjs/common");
const cache_manager_1 = require("@nestjs/cache-manager");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("../../lib/constants");
const events_1 = require("../mails-handler/events");
const otp_service_1 = require("../otp/otp.service");
const user_service_1 = require("../user/user.service");
const user_entity_1 = require("../user/entities/user.entity");
const crypto = require("crypto");
const shared_1 = require("../../lib/shared");
let AuthService = class AuthService {
    constructor(configService, cacheManager, jwtService, userService, otpService, mailEvents, smsService) {
        this.configService = configService;
        this.cacheManager = cacheManager;
        this.jwtService = jwtService;
        this.userService = userService;
        this.otpService = otpService;
        this.mailEvents = mailEvents;
        this.smsService = smsService;
        this.googleApiClient = axios_1.default.create({
            baseURL: this.configService.get('GOOGLE_API_URL'),
        });
    }
    async findUser(filter) {
        const user = await this.userService.findOne({
            phoneNumber: filter.phoneNumber,
            mail: filter.mail,
        });
        if (!user) {
            throw new common_1.NotFoundException('No user found with provided mail');
        }
        if (user.status != constants_1.USER_STATUS.ACTIVE)
            throw new common_1.ForbiddenException('Account is blocked');
        if (user.verificationStatus != constants_1.USER_VERIFICATION_STATUS.VERIFIED)
            throw new common_1.ForbiddenException(`Account verification is ${user.verificationStatus}`);
        return user;
    }
    async validatePassword(currentPassword, password) {
        const isValidPassword = await (0, user_entity_1.comparePassword)({
            currentPassword: currentPassword,
            comparePassword: password,
        }).catch(() => {
            throw new common_1.HttpException('Invalid Password', 400);
        });
        if (!isValidPassword)
            throw new common_1.HttpException('Invalid Password', 400);
    }
    decryptHashedPassword(encryptedPassword) {
        try {
            const privateKey = this.configService.get('PASSWORD_SECRET');
            console.log('privateKey==>', privateKey);
            const decryptedData = crypto.privateDecrypt(privateKey, Buffer.from(encryptedPassword, 'hex'));
            return decryptedData.toString('utf-8');
        }
        catch (error) {
            throw error;
        }
    }
    async generateAccessToken(user) {
        const payload = {
            sub: user._id,
            name: user.name,
        };
        return await this.jwtService.signAsync(payload);
    }
    extractTokenPayload(token) {
        if (!token || token === '')
            return;
        return this.jwtService.decode(token);
    }
    getBearerTokenFromHeader(header) {
        return header.split(' ')[1];
    }
    async adminSignIn(loginDto) {
        const user = await this.findUser({ mail: loginDto.mail });
        user.lastLoginAt = new Date();
        await user.save();
        await this.validatePassword(user.password, loginDto.password);
        const { password, ...userBody } = user.toJSON();
        const access_token = await this.generateAccessToken(user);
        return {
            ...userBody,
            access_token,
        };
    }
    async userAuthUsingGoogleToken(google_token) {
        try {
            const googleResp = await this.googleApiClient.get('/oauth2/v3/userinfo', {
                params: { access_token: google_token },
            });
            if (googleResp.status > 300 || googleResp.data == null)
                throw new common_1.UnauthorizedException('Failed to fetch user data');
            const { given_name, email, picture } = googleResp.data;
            const user = {
                mail: email,
                name: given_name,
                imageUrl: picture,
                platform: constants_1.PLATFORMS.EDHIPPO_APP,
            };
            return this.userOAuthRegistration(user);
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Failed to fetch user data');
        }
    }
    async userOAuthRegistration(userDto) {
        userDto.role = constants_1.USER_ROLE.USER;
        userDto.verificationStatus = constants_1.USER_VERIFICATION_STATUS.VERIFIED;
        let user = await this.userService.findOrCreateUser(userDto);
        user.lastLoginAt = new Date();
        await user.save();
        const { password, ...userDate } = user.toJSON();
        if (user.role !== constants_1.USER_ROLE.USER)
            throw new common_1.ForbiddenException('Forbidden resource, Invalid access');
        const access_token = await this.generateAccessToken(user);
        return { ...userDate, access_token };
    }
    validateUserFromAuthHeader(authHeader) {
        const token = this.getBearerTokenFromHeader(authHeader);
        const payload = this.extractTokenPayload(token);
        return this.validateUserFromJwtPayload(payload);
    }
    async validateUserFromJwtPayload(payload) {
        if (payload == null)
            throw new common_1.BadRequestException('Invalid Token');
        const userId = payload.sub;
        let user = await this.cacheManager.get(`auth:details:user:${userId}`);
        if (user == null) {
            const userData = await this.userService.findOneById(userId);
            if (userData != null) {
                user = userData.toJSON();
                user._id = user.id ?? user._id?.toString();
                await this.cacheManager.set(`auth:details:user:${user._id?.toString()}`, user, 120);
            }
        }
        if (!user)
            throw new common_1.UnauthorizedException();
        if (user.status != constants_1.USER_STATUS.ACTIVE)
            throw new common_1.UnauthorizedException('User is blocked');
        return user;
    }
    async sendOtpForLoginOrRegister(body) {
        const user = await this.userService.findOne({
            phoneNumber: body.phoneNumber,
        });
        const otp = await this.otpService.generateAndSaveOtpForPhone({
            ...body,
            userId: user?._id,
        });
        if (otp.created) {
            this.smsService.sendSms(otp.data.phoneNumber, otp.data.otp);
        }
        return {
            ...body,
            name: user?.name,
            timeout: otp.data.timeout,
        };
    }
    async verifyRegistrationOtp(body) {
        return await this.userService.verifyAndCreateUser(body);
    }
    async sendForgotOtp(mail) {
        const user = await this.findUser({ mail });
        if (!user)
            throw new common_1.NotFoundException('User Not Found!');
        const otp = await this.otpService.generateAndSaveOtpForEmail({
            email: user.mail,
            phoneNumber: user.phoneNumber,
            userId: user._id,
        });
        if (otp.created) {
            console.log('sending forgot mail ....');
            this.mailEvents.forgotPasswordOtpMail(user, otp.data);
        }
        return {
            email: user.mail,
            userId: user._id,
            timeout: otp.data.timeout,
        };
    }
    async createForgotSession(body) {
        const validatedOtpData = await this.otpService.validateOtpForEmail(body.mail, body.otp);
        if (validatedOtpData.userId == null)
            throw new common_1.ForbiddenException('Verification Failed, Please retry');
        const payload = { sub: validatedOtpData.userId };
        return {
            token: await this.jwtService.signAsync(payload, {
                expiresIn: 300,
                secret: this.configService.get('FORGOT_SESSION_SECRET'),
            }),
        };
    }
    async resetPassword({ token, password }) {
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get('FORGOT_SESSION_SECRET'),
            });
            const user = await this.userService.findOneById(payload.sub);
            if (user == null)
                throw new common_1.ForbiddenException('Verification Failed, please retry after some time');
            return await this.userService.findAndUpdate(user._id, { password });
        }
        catch (error) {
            throw new common_1.ForbiddenException('Verification Failed, Please retry');
        }
    }
    async firebaseLogin(body) {
        return await this.userService.firebaseLogin(body);
    }
    async sendNameForLoginOrRegister(body) {
        const user = await this.userService.findOne({
            phoneNumber: body.phoneNumber,
        });
        if (user?.name) {
            return {
                name: user.name,
            };
        }
        return {};
    }
    async firebaseLoginBYGooGle(body) {
        return await this.userService.firebaseLoginByGoogle(body);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __metadata("design:paramtypes", [config_1.ConfigService, Object, jwt_1.JwtService,
        user_service_1.UserService,
        otp_service_1.OtpService,
        events_1.MailEvents,
        shared_1.SMSService])
], AuthService);
//# sourceMappingURL=auth.service.js.map