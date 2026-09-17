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
