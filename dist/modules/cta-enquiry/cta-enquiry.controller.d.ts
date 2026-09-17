import { CtaEnquiryService } from './cta-enquiry.service';
import { CreateCtaEnquiryDto } from './dto/create-cta-enquiry.dto';
import { CtaEnquiryFilterDto } from './dto/filter-cta-enquiry.dto';
export declare class CtaEnquiryController {
    private readonly ctaEnquiryService;
    constructor(ctaEnquiryService: CtaEnquiryService);
    create(createSchoolEnquiryDto: CreateCtaEnquiryDto): Promise<import("../../lib/repository").CreatedModel<import("./interface").ICTAEnquiryDocument>>;
    findAll(filter: CtaEnquiryFilterDto): Promise<{
        data: import("./interface").ICTAEnquiryDocument[];
        totalCount: number;
    }>;
    findOne(id: string): Promise<import("./interface").ICTAEnquiryDocument>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("./interface").ICTAEnquiryDocument> & import("./interface").ICTAEnquiry & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
