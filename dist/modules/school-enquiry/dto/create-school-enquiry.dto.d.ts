import { GENDER, SCHOOL_ENQUIRY_STATUS } from '@/src/lib/constants';
import { ISchoolEnquiry } from '../interface';
export declare class CreateSchoolEnquiryDto implements Omit<ISchoolEnquiry, 'userIp'> {
    name: string;
    email: string;
    phoneNumber: string;
    schoolType: string;
    city: string;
    class: string;
    pageUrl: string;
    userIp?: string;
    gender: GENDER;
    status: SCHOOL_ENQUIRY_STATUS;
    message?: string;
    submittedAt: Date;
}
