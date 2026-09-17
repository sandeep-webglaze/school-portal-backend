import { IOtp } from '../otp/interface';
import { IUser } from '../user/interface';
import { ISchoolEnquiry } from '../school-enquiry/interface';
import { MailService } from './mail.service';
import { ISchool } from '../school/interface';
export declare class MailEvents {
    private mailService;
    private supportEmail;
    private enquiryNotificationMails;
    constructor(mailService: MailService);
    userRegistrationOtpMail(userName: string, userEmail: string, otp: IOtp): void;
    forgotPasswordOtpMail(user: IUser, otp: IOtp): void;
    schoolEnquiryMail(enquiry: ISchoolEnquiry): void;
    mailSchoolDetails(userMail: string, school: ISchool): void;
}
