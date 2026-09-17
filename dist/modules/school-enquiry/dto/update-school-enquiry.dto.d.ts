import { CreateSchoolEnquiryDto } from "./create-school-enquiry.dto";
declare const UpdateEnquiriesDto_base: import("@nestjs/common").Type<Partial<Omit<CreateSchoolEnquiryDto, "submittedAt">>>;
export declare class UpdateEnquiriesDto extends UpdateEnquiriesDto_base {
    enquiriesIds: string[];
}
export {};
