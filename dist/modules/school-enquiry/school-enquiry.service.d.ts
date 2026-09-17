/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Connection } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { PLATFORMS } from '@/src/lib/constants';
import { LeadsService } from '../leads/leads.service';
import { MailEvents } from '../mails-handler/events';
import { SchoolEnquiryRepository } from './school-enquiry.repository';
import { CreateSchoolEnquiryDto } from './dto/create-school-enquiry.dto';
import { SchoolEnquiryFilterDto } from './dto/school-enquiry-filter.dto';
import { UpdateEnquiriesDto } from './dto/update-school-enquiry.dto';
export declare class SchoolEnquiryService {
    private readonly connection;
    private readonly mailEvents;
    private readonly configService;
    readonly repository: SchoolEnquiryRepository;
    readonly leadsService: LeadsService;
    constructor(connection: Connection, mailEvents: MailEvents, configService: ConfigService, repository: SchoolEnquiryRepository, leadsService: LeadsService);
    create(userIp: string, createSchoolEnquiryDto: CreateSchoolEnquiryDto): Promise<import("../../lib/repository").CreatedModel<import("./interface").ISchoolEnquiryDocument>>;
    sendToWgLeadApi(data: any): Promise<void>;
    findAll(filterDto: SchoolEnquiryFilterDto): Promise<{
        data: import("./interface").ISchoolEnquiryDocument[];
        totalCount: number;
    }>;
    findOne(id: string): Promise<import("./interface").ISchoolEnquiryDocument>;
    updateEnquiries({ enquiriesIds, ...updateDto }: UpdateEnquiriesDto): Promise<import("../../lib/repository").UpdatedModel>;
    remove(id: string[] | string): Promise<import("../../lib/repository").RemovedModel>;
    getEnquiryPlatform(pageUrl: string): "" | PLATFORMS;
}
