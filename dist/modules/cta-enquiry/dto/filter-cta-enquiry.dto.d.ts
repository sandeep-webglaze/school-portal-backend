import { PaginateParamDto } from '@/src/lib/shared';
import { ICTAEnquiry } from '../interface';
export declare class CtaEnquiryFilterDto extends PaginateParamDto implements ICTAEnquiry {
    pageUrl: string;
    name: string;
    phoneNumber: string;
}
