import { Request } from 'express';
import { SchoolEnquiryService } from './school-enquiry.service';
import { CreateSchoolEnquiryDto } from './dto/create-school-enquiry.dto';
import { SchoolEnquiryFilterDto } from './dto/school-enquiry-filter.dto';
import { BulkRemoveSchoolEnquiry } from './dto/delete-school-enquiry.dto';
import { UpdateEnquiriesDto } from './dto/update-school-enquiry.dto';
export declare class SchoolEnquiryController {
    private readonly schoolEnquiryService;
    constructor(schoolEnquiryService: SchoolEnquiryService);
    create(createSchoolEnquiryDto: CreateSchoolEnquiryDto, request: Request): Promise<import("../../lib/repository").CreatedModel<import("./interface").ISchoolEnquiryDocument>>;
    findAll(filter: SchoolEnquiryFilterDto): Promise<{
        data: import("./interface").ISchoolEnquiryDocument[];
        totalCount: number;
    }>;
    findOne(id: string): Promise<import("./interface").ISchoolEnquiryDocument>;
    update(updateLeadDto: UpdateEnquiriesDto): Promise<import("../../lib/repository").UpdatedModel>;
    removeMany(body: BulkRemoveSchoolEnquiry): Promise<import("../../lib/repository").RemovedModel>;
    remove(id: string): Promise<import("../../lib/repository").RemovedModel>;
}
