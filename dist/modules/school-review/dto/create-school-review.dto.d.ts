import { Types } from "mongoose";
import { ISchoolReview } from "../interface";
export declare class CreateSchoolReviewDto implements Omit<ISchoolReview, 'user'> {
    schoolId: string | Types.ObjectId;
    academics: number;
    infrastructure: number;
    addmission: number;
    extracurriclar: number;
    overallRating: number;
    review: string;
}
