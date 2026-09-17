import * as moment from 'moment';
import { Injectable } from '@nestjs/common';
import { OTPLimitExceedException, OTPExpiredException, InvalidOTPException } from '@/src/lib/exceptions';
import { OTP_STATUS, OTP_DELTA_TIME_MIN, OTP_TIME_OUT_MINUTE, OTP_MAX_RETRIES, OTP_LIMIT_IN_DELTA, OTP_MAX_LENGTH } from '@/src/lib/constants';
import { IOtp } from './interface';
import { OtpRepository } from './otp.repository';
import { SendOtpDto } from './dto/send-otp.dto';

@Injectable()
export class OtpService {
  constructor(
    private otpRepo: OtpRepository,
  ) { }

  private generateOtp(otpLength: number = OTP_MAX_LENGTH): string {
    return Array.from({ length: otpLength }, () => Math.floor(Math.random() * 10)).join('');
  }

  private async throwErrorIfOtpLimitExceeded(identifier: string) {
    const afterTime = moment(Date.now()).subtract(OTP_DELTA_TIME_MIN, 'm').toDate();
    const oldOtps = await this.otpRepo.getOtpListAfter(identifier, afterTime);

    if (oldOtps.length >= OTP_LIMIT_IN_DELTA) {
      throw new OTPLimitExceedException();
    }
  }

  // Generate OTP for Phone Number
  async generateAndSaveOtpForPhone(data: SendOtpDto) {
    await this.throwErrorIfOtpLimitExceeded(data.phoneNumber);

    const otp = this.generateOtp();
    const timeoutTime = moment(Date.now()).add(OTP_TIME_OUT_MINUTE, 'm').toDate();

    const otpDoc: IOtp = {
      phoneNumber: data.phoneNumber,
      otp,
      userId: data.userId,
      timeout: timeoutTime,
      retriesLeft: OTP_MAX_RETRIES,
      status: OTP_STATUS.PENDING,
    };

    return await this.otpRepo.create(otpDoc);
  }

  // Generate OTP for Email
  async generateAndSaveOtpForEmail(data: SendOtpDto) {
    await this.throwErrorIfOtpLimitExceeded(data.email);

    const otp = this.generateOtp();
    const timeoutTime = moment(Date.now()).add(OTP_TIME_OUT_MINUTE, 'm').toDate();

    const otpDoc: IOtp = {
      email: data.email,
      otp,
      userId: data.userId,
      timeout: timeoutTime,
      retriesLeft: OTP_MAX_RETRIES,
      status: OTP_STATUS.PENDING,
    };

    return await this.otpRepo.create(otpDoc);
  }

  // Validate OTP for Phone Number
  async validateOtpForPhone(phoneNumber: string, otp: string) {
    const latestOtp = await this.otpRepo.getLatestOtp(phoneNumber);
    if (!latestOtp) throw new InvalidOTPException();

    if (moment().isAfter(latestOtp.timeout) || latestOtp.retriesLeft < 1) {
      latestOtp.retriesLeft = 0;
      latestOtp.status = OTP_STATUS.FAILURE;
      await latestOtp.save();
      throw new OTPExpiredException();
    }

    if (latestOtp.otp !== otp) {
      latestOtp.retriesLeft -= 1;
      await latestOtp.save();
      throw new InvalidOTPException();
    }

    latestOtp.retriesLeft = 0;
    latestOtp.status = OTP_STATUS.SUCCESS;
    await latestOtp.save();

    return { isVerified: true, userId: latestOtp.userId, phoneNumber: latestOtp.phoneNumber };
  }

  // Validate OTP for Email
  async validateOtpForEmail(email: string, otp: string) {
    const latestOtp = await this.otpRepo.getLatestOtp(email);
    if (!latestOtp) throw new InvalidOTPException();

    if (moment().isAfter(latestOtp.timeout) || latestOtp.retriesLeft < 1) {
      latestOtp.retriesLeft = 0;
      latestOtp.status = OTP_STATUS.FAILURE;
      await latestOtp.save();
      throw new OTPExpiredException();
    }

    if (latestOtp.otp !== otp) {
      latestOtp.retriesLeft -= 1;
      await latestOtp.save();
      throw new InvalidOTPException();
    }

    latestOtp.retriesLeft = 0;
    latestOtp.status = OTP_STATUS.SUCCESS;
    await latestOtp.save();

    return { isVerified: true, userId: latestOtp.userId, email: latestOtp.email };
  }
}
