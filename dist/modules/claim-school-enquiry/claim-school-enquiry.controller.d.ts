import { ClaimSchoolEnquiryService } from './claim-school-enquiry.service';
import { CreateClaimSchoolEnquiryDto } from './dto/create-claim-school-enquiry.dto';
import { UpdateClaimSchoolEnquiryDto } from './dto/update-claim-school-enquiry.dto';
import { BulkRemoveClaimSchoolEnquiry } from './dto/remove-claim-school-enquiry';
import { FilterClaimSchoolEnquiryDto } from './dto/filter-claim-school-enquiry.dto';
export declare class ClaimSchoolEnquiryController {
    private readonly claimSchoolEnquiryService;
    constructor(claimSchoolEnquiryService: ClaimSchoolEnquiryService);
    create(createClaimSchoolEnquiryDto: CreateClaimSchoolEnquiryDto): Promise<import("../../lib/repository").CreatedModel<import("./interface").IClaimSchoolEnquiryDocument>>;
    findAll(filter: FilterClaimSchoolEnquiryDto): Promise<{
        data: import("./interface").IClaimSchoolEnquiryDocument[];
        totalCount: number;
    }>;
    findOne(id: string): Promise<import("./interface").IClaimSchoolEnquiryDocument>;
    update(id: string, updateClaimSchoolEnquiryDto: UpdateClaimSchoolEnquiryDto): Promise<import("../../lib/repository").UpdatedModel>;
    removeMany(body: BulkRemoveClaimSchoolEnquiry): Promise<import("../../lib/repository").RemovedModel>;
    remove(id: string): Promise<import("../../lib/repository").RemovedModel>;
}
