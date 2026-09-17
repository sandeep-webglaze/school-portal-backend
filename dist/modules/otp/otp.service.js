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
exports.OtpService = void 0;
const moment = require("moment");
const common_1 = require("@nestjs/common");
const exceptions_1 = require("../../lib/exceptions");
const constants_1 = require("../../lib/constants");
const otp_repository_1 = require("./otp.repository");
let OtpService = class OtpService {
    constructor(otpRepo) {
        this.otpRepo = otpRepo;
    }
    generateOtp(otpLength = constants_1.OTP_MAX_LENGTH) {
        return Array.from({ length: otpLength }, () => Math.floor(Math.random() * 10)).join('');
    }
    async throwErrorIfOtpLimitExceeded(identifier) {
        const afterTime = moment(Date.now()).subtract(constants_1.OTP_DELTA_TIME_MIN, 'm').toDate();
        const oldOtps = await this.otpRepo.getOtpListAfter(identifier, afterTime);
        if (oldOtps.length >= constants_1.OTP_LIMIT_IN_DELTA) {
            throw new exceptions_1.OTPLimitExceedException();
        }
    }
    async generateAndSaveOtpForPhone(data) {
        await this.throwErrorIfOtpLimitExceeded(data.phoneNumber);
        const otp = this.generateOtp();
        const timeoutTime = moment(Date.now()).add(constants_1.OTP_TIME_OUT_MINUTE, 'm').toDate();
        const otpDoc = {
            phoneNumber: data.phoneNumber,
            otp,
            userId: data.userId,
            timeout: timeoutTime,
            retriesLeft: constants_1.OTP_MAX_RETRIES,
            status: constants_1.OTP_STATUS.PENDING,
        };
        return await this.otpRepo.create(otpDoc);
    }
    async generateAndSaveOtpForEmail(data) {
        await this.throwErrorIfOtpLimitExceeded(data.email);
        const otp = this.generateOtp();
        const timeoutTime = moment(Date.now()).add(constants_1.OTP_TIME_OUT_MINUTE, 'm').toDate();
        const otpDoc = {
            email: data.email,
            otp,
            userId: data.userId,
            timeout: timeoutTime,
            retriesLeft: constants_1.OTP_MAX_RETRIES,
            status: constants_1.OTP_STATUS.PENDING,
        };
        return await this.otpRepo.create(otpDoc);
    }
    async validateOtpForPhone(phoneNumber, otp) {
        const latestOtp = await this.otpRepo.getLatestOtp(phoneNumber);
        if (!latestOtp)
            throw new exceptions_1.InvalidOTPException();
        if (moment().isAfter(latestOtp.timeout) || latestOtp.retriesLeft < 1) {
            latestOtp.retriesLeft = 0;
            latestOtp.status = constants_1.OTP_STATUS.FAILURE;
            await latestOtp.save();
            throw new exceptions_1.OTPExpiredException();
        }
        if (latestOtp.otp !== otp) {
            latestOtp.retriesLeft -= 1;
            await latestOtp.save();
            throw new exceptions_1.InvalidOTPException();
        }
        latestOtp.retriesLeft = 0;
        latestOtp.status = constants_1.OTP_STATUS.SUCCESS;
        await latestOtp.save();
        return { isVerified: true, userId: latestOtp.userId, phoneNumber: latestOtp.phoneNumber };
    }
    async validateOtpForEmail(email, otp) {
        const latestOtp = await this.otpRepo.getLatestOtp(email);
        if (!latestOtp)
            throw new exceptions_1.InvalidOTPException();
        if (moment().isAfter(latestOtp.timeout) || latestOtp.retriesLeft < 1) {
            latestOtp.retriesLeft = 0;
            latestOtp.status = constants_1.OTP_STATUS.FAILURE;
            await latestOtp.save();
            throw new exceptions_1.OTPExpiredException();
        }
        if (latestOtp.otp !== otp) {
            latestOtp.retriesLeft -= 1;
            await latestOtp.save();
            throw new exceptions_1.InvalidOTPException();
        }
        latestOtp.retriesLeft = 0;
        latestOtp.status = constants_1.OTP_STATUS.SUCCESS;
        await latestOtp.save();
        return { isVerified: true, userId: latestOtp.userId, email: latestOtp.email };
    }
};
exports.OtpService = OtpService;
exports.OtpService = OtpService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [otp_repository_1.OtpRepository])
], OtpService);
//# sourceMappingURL=otp.service.js.map