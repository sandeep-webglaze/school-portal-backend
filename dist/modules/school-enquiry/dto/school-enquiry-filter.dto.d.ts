import { PLATFORMS, GENDER, SCHOOL_ENQUIRY_STATUS } from '@/src/lib/constants';
import { PaginateParamDto } from '@/src/lib/shared';
import { ISchoolEnquiry } from '../interface';
export declare class SchoolEnquiryFilterDto extends PaginateParamDto implements Partial<ISchoolEnquiry> {
    name: string;
    email: string;
    schoolType: string;
    city: string;
    gender: GENDER;
    status: SCHOOL_ENQUIRY_STATUS;
    userIp: string;
    pageUrl: string;
    submittedAt: Date;
    platform: PLATFORMS;
}
