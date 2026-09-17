/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
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
