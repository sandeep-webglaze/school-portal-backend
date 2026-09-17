import { IOtp } from '../interface';
export declare class SendOtpDto implements Pick<IOtp, 'email' | 'phoneNumber' | 'userId'> {
    email?: string;
    phoneNumber: string;
    userId?: string;
}
export declare class SendOtpResponse {
    static description: () => string;
    phoneNumber: string;
    email: string;
    timeout: string;
}
