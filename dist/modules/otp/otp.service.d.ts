import { OtpRepository } from './otp.repository';
import { SendOtpDto } from './dto/send-otp.dto';
export declare class OtpService {
    private otpRepo;
    constructor(otpRepo: OtpRepository);
    private generateOtp;
    private throwErrorIfOtpLimitExceeded;
    generateAndSaveOtpForPhone(data: SendOtpDto): Promise<import("../../lib/repository").CreatedModel<import("./interface").IOTPDocument>>;
    generateAndSaveOtpForEmail(data: SendOtpDto): Promise<import("../../lib/repository").CreatedModel<import("./interface").IOTPDocument>>;
    validateOtpForPhone(phoneNumber: string, otp: string): Promise<{
        isVerified: boolean;
        userId: string | import("mongoose").Types.ObjectId;
        phoneNumber: string;
    }>;
    validateOtpForEmail(email: string, otp: string): Promise<{
        isVerified: boolean;
        userId: string | import("mongoose").Types.ObjectId;
        email: string;
    }>;
}
