import { CreateCtaEnquiryDto } from './dto/create-cta-enquiry.dto';
import { CtaEnquiryFilterDto } from './dto/filter-cta-enquiry.dto';
import { CtaEnquiryRepository } from './cta-enquiry.repository';
export declare class CtaEnquiryService {
    readonly repository: CtaEnquiryRepository;
    constructor(repository: CtaEnquiryRepository);
    create(createCtaEnquiryDto: CreateCtaEnquiryDto): Promise<import("../../lib/repository").CreatedModel<import("./interface").ICTAEnquiryDocument>>;
    findAll(filterDto: CtaEnquiryFilterDto): Promise<{
        data: import("./interface").ICTAEnquiryDocument[];
        totalCount: number;
    }>;
    findOne(id: string): Promise<import("./interface").ICTAEnquiryDocument>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("./interface").ICTAEnquiryDocument> & import("./interface").ICTAEnquiry & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
