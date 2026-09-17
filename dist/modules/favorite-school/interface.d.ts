import { Document, Types } from "mongoose";
export interface IFavoriteSchool {
    user: string | Types.ObjectId;
    school: string | Types.ObjectId;
}
export type IFavoriteSchoolDocument = IFavoriteSchool & Document;
