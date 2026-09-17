import { Document } from 'mongoose';
import { GENDER, SCHOOL_ENQUIRY_STATUS } from '@/src/lib/constants';
import { ISchoolTypeDocument } from '../school-types/interface';
import { ICityDocument } from '../city/interface';
export interface ISchoolEnquiry {
    name: string;
    email: string;
    phoneNumber: string;
    schoolType: string | ISchoolTypeDocument;
    city: string | ICityDocument;
    class: string;
    userIp: string;
    pageUrl: string;
    gender: GENDER;
    status: SCHOOL_ENQUIRY_STATUS;
    submittedAt: Date;
    message?: string;
    platform?: string;
}
export type ISchoolEnquiryDocument = ISchoolEnquiry & Document;
