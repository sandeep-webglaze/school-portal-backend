import { Document, Types } from "mongoose";
import { IUserDocument } from "../user/interface";

export interface ISchoolReview {
    user: string | Types.ObjectId | IUserDocument,
    schoolId: string | Types.ObjectId,
    academics: number,
    infrastructure: number,
    addmission: number,
    extracurriclar: number,
    overallRating: number,
    review: string
}
export type ISchoolReviewDcoument = ISchoolReview & Document;