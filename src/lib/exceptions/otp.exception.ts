import { BadRequestException } from '@nestjs/common';

export class OTPLimitExceedException extends BadRequestException {
  constructor() {
    super('The OTP limit exceeded! Please wait for sometime.');
  }
}

export class InvalidOTPException extends BadRequestException {
  constructor() {
    super('Invalid OTP');
  }
}

export class OTPExpiredException extends BadRequestException {
  constructor() {
    super('OTP has expired.Please retry sending OTP');
  }
}
