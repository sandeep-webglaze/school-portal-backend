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
import { Connection, QueryOptions, Types } from 'mongoose';
import { IUserObj } from '../../user/interface';
import { MailEvents } from '../../mails-handler';
import { SlugService } from '../../slug/slug.service';
import { UploadService } from '../../upload/upload.service';
import { SchoolReviewService } from '../../school-review/school-review.service';
import { CreateSchoolDto, FeaturedSchoolPriorityDto, UpdateSchoolDto } from '../dto/school.dto';
import { SchoolRepository } from '../repositories/school.repository';
import { SchoolFilterDto } from '../dto/school-filter.dto';
export declare class SchoolService {
    private readonly connection;
    private readonly mailEvents;
    readonly repository: SchoolRepository;
    readonly slugService: SlugService;
    readonly schoolReviewService: SchoolReviewService;
    readonly uploadService: UploadService;
    private readonly logger;
    constructor(connection: Connection, mailEvents: MailEvents, repository: SchoolRepository, slugService: SlugService, schoolReviewService: SchoolReviewService, uploadService: UploadService);
    private schoolIdFilters;
    private getSchoolReviews;
    create(createSchoolDto: CreateSchoolDto): Promise<import("../../../lib/repository").CreatedModel<import("../interface").ISchoolDocument>>;
    findAll(filterDto: SchoolFilterDto): Promise<{
        schools: import("../interface").ISchoolDocument[];
        slugData: any;
        totalCount: number;
    }>;
    findOne({ slug, id }: {
        id?: string;
        slug?: string;
    }): Promise<import("mongoose").Document<unknown, {}, import("../interface").ISchoolDocument> & import("../interface").ISchool & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }>;
    sendDetailsToMail(user: IUserObj, schoolId: string): Promise<{
        success: boolean;
    }>;
    update(id: string, { removeImageUrls, ...updateSchoolDto }: UpdateSchoolDto): Promise<import("../../../lib/repository").UpdatedModel>;
    updateSchoolData(id: string, { removeImageUrls, ...updateSchoolDto }: UpdateSchoolDto, options: QueryOptions): Promise<import("../../../lib/repository").UpdatedModel>;
    updateFeaturedSchoolPriority(priorities?: FeaturedSchoolPriorityDto[]): Promise<import("mongodb").BulkWriteResult>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("../interface").ISchoolDocument> & import("../interface").ISchool & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }>;
}
