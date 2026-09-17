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
import { CreateSchoolReviewDto } from './dto/create-school-review.dto';
import { UpdateSchoolReviewDto } from './dto/update-school-review.dto';
import { SchoolReviewFilterDto } from './dto/school-review-filter.dto';
import { SchoolReviewRepository } from './school-review.repository';
import { SchoolService } from '../school/services/school.service';
import { ISchoolReview } from './interface';
export declare class SchoolReviewService {
    private readonly connection;
    readonly repository: SchoolReviewRepository;
    readonly schoolService: SchoolService;
    constructor(connection: Connection, repository: SchoolReviewRepository, schoolService: SchoolService);
    create(userId: string, { schoolId, ...userReview }: CreateSchoolReviewDto): Promise<import("../../lib/repository").UpdatedModel>;
    findAll(schoolFilterDto: SchoolReviewFilterDto): Promise<{
        data: import("./interface").ISchoolReviewDcoument[];
        totalCount: number;
    }>;
    update(id: string, updateSchoolReviewDto: UpdateSchoolReviewDto): Promise<import("../../lib/repository").UpdatedModel>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("./interface").ISchoolReviewDcoument> & ISchoolReview & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
