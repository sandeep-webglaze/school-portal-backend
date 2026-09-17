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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { IUserObj } from '../user/interface';
import { SchoolReviewService } from './school-review.service';
import { CreateSchoolReviewDto } from './dto/create-school-review.dto';
import { UpdateSchoolReviewDto } from './dto/update-school-review.dto';
import { SchoolReviewFilterDto } from './dto/school-review-filter.dto';
export declare class SchoolReviewController {
    private readonly schoolReviewService;
    constructor(schoolReviewService: SchoolReviewService);
    create(user: IUserObj, createSchoolReviewDto: CreateSchoolReviewDto): Promise<import("../../lib/repository").UpdatedModel>;
    findAll(user: IUserObj, filter: SchoolReviewFilterDto): Promise<{
        data: import("./interface").ISchoolReviewDcoument[];
        totalCount: number;
    }>;
    schoolReviews(schoolId: string, filter: SchoolReviewFilterDto): Promise<{
        data: import("./interface").ISchoolReviewDcoument[];
        totalCount: number;
    }>;
    update(user: IUserObj, id: string, updateSchoolReviewDto: UpdateSchoolReviewDto): Promise<import("../../lib/repository").UpdatedModel>;
    remove(user: IUserObj, id: string): Promise<import("mongoose").Document<unknown, {}, import("./interface").ISchoolReviewDcoument> & import("./interface").ISchoolReview & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
