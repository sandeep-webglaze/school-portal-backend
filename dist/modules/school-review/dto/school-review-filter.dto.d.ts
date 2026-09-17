import { PaginateParamDto } from "@/src/lib/shared";
import { ISchoolReview } from "../interface";
export declare class SchoolReviewFilterDto extends PaginateParamDto implements Partial<ISchoolReview> {
    user: string;
    schoolId: string;
    academics: number;
    infrastructure: number;
    addmission: number;
    extracurriclar: number;
    overallRating: number;
}
