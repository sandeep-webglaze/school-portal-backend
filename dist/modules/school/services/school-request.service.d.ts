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
import { CreateSchoolRequestDto, SchoolRequestFilterDto, UpdateSchoolRequestDto } from '../dto/school-request.dto';
import { SchoolRequestRepository } from '../repositories/school-request.repository';
import { SchoolService } from './school.service';
export declare class SchoolRequestService {
    private readonly connection;
    readonly repository: SchoolRequestRepository;
    readonly schoolService: SchoolService;
    constructor(connection: Connection, repository: SchoolRequestRepository, schoolService: SchoolService);
    create(school: string, createDto: CreateSchoolRequestDto): Promise<import("../../../lib/repository").CreatedModel<import("../interface").ISchoolRequestDocument>>;
    findAll(filterDto: SchoolRequestFilterDto): Promise<{
        data: import("../interface").ISchoolRequestDocument[];
        totalCount: number;
    }>;
    findOne(id: string): Promise<import("../interface").ISchoolRequestDocument>;
    updateRequest(schoolId: string, updateDto: UpdateSchoolRequestDto): Promise<import("../../../lib/repository").UpdatedModel>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("../interface").ISchoolRequestDocument> & import("../interface").ISchoolRequest & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
