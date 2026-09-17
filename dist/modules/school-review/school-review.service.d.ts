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
