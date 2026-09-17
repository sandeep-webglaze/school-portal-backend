import { CreateClaimSchoolEnquiryDto } from './dto/create-claim-school-enquiry.dto';
import { UpdateClaimSchoolEnquiryDto } from './dto/update-claim-school-enquiry.dto';
import { ClaimSchoolEnquiryRepository } from './claim-school-enquiry.repository';
import { FilterClaimSchoolEnquiryDto } from './dto/filter-claim-school-enquiry.dto';
export declare class ClaimSchoolEnquiryService {
    readonly repository: ClaimSchoolEnquiryRepository;
    constructor(repository: ClaimSchoolEnquiryRepository);
    create(createSchoolEnquiryDto: CreateClaimSchoolEnquiryDto): Promise<import("../../lib/repository").CreatedModel<import("./interface").IClaimSchoolEnquiryDocument>>;
    findAll(filterDto: FilterClaimSchoolEnquiryDto): Promise<{
        data: import("./interface").IClaimSchoolEnquiryDocument[];
        totalCount: number;
    }>;
    findOne(id: string): Promise<import("./interface").IClaimSchoolEnquiryDocument>;
    update(id: string, updateDto: UpdateClaimSchoolEnquiryDto): Promise<import("../../lib/repository").UpdatedModel>;
    remove(id: string[] | string): Promise<import("../../lib/repository").RemovedModel>;
}
