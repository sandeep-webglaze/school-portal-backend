import { PaginateParamDto } from "@/src/lib/shared";
import { IClaimSchoolEnquiry } from "../interface";
export declare class FilterClaimSchoolEnquiryDto extends PaginateParamDto implements Partial<IClaimSchoolEnquiry> {
    name: string;
    email: string;
    school: string;
}
