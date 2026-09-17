import { OTP_STATUS } from '@/src/lib/constants';
import { Document, Types } from 'mongoose';

export interface IOtp {
    otp: string;
    email?: string;
    phoneNumber?: string;
    userId?: string | Types.ObjectId;
    timeout: Date;
    retriesLeft: number;
    status: OTP_STATUS;
}
export type IOTPDocument = IOtp & Document;
