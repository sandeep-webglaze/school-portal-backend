"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTPExpiredException = exports.InvalidOTPException = exports.OTPLimitExceedException = void 0;
const common_1 = require("@nestjs/common");
class OTPLimitExceedException extends common_1.BadRequestException {
    constructor() {
        super('The OTP limit exceeded! Please wait for sometime.');
    }
}
exports.OTPLimitExceedException = OTPLimitExceedException;
class InvalidOTPException extends common_1.BadRequestException {
    constructor() {
        super('Invalid OTP');
    }
}
exports.InvalidOTPException = InvalidOTPException;
class OTPExpiredException extends common_1.BadRequestException {
    constructor() {
        super('OTP has expired.Please retry sending OTP');
    }
}
exports.OTPExpiredException = OTPExpiredException;
//# sourceMappingURL=otp.exception.js.map