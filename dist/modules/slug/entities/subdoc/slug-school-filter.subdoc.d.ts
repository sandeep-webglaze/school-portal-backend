import { Schema } from "mongoose";
import { ISlugSchoolFilter } from "../../interface";
export declare const SlugSchoolFilterSchema: Schema<ISlugSchoolFilter, import("mongoose").Model<ISlugSchoolFilter, any, any, any, import("mongoose").Document<unknown, any, ISlugSchoolFilter> & Partial<Pick<import("../../../school/interface").ISchool, "classification" | "city">> & {
    type?: string | import("mongoose").Types.ObjectId;
    schoolBoard?: string | import("mongoose").Types.ObjectId;
    school?: string | import("mongoose").Types.ObjectId;
} & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ISlugSchoolFilter, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ISlugSchoolFilter>> & import("mongoose").FlatRecord<ISlugSchoolFilter> & {
    _id: import("mongoose").Types.ObjectId;
}>;
