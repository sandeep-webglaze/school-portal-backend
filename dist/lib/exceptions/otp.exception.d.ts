import { BadRequestException } from '@nestjs/common';
export declare class OTPLimitExceedException extends BadRequestException {
    constructor();
}
export declare class InvalidOTPException extends BadRequestException {
    constructor();
}
export declare class OTPExpiredException extends BadRequestException {
    constructor();
}
