import { Schema, Types } from "mongoose";
import { IFavoriteSchool } from "../interface";
export declare const FavoriteSchema: Schema<IFavoriteSchool, import("mongoose").Model<IFavoriteSchool, any, any, any, import("mongoose").Document<unknown, any, IFavoriteSchool> & IFavoriteSchool & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IFavoriteSchool, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<IFavoriteSchool>> & import("mongoose").FlatRecord<IFavoriteSchool> & {
    _id: Types.ObjectId;
}>;
export declare const FavoriteSchoolModel: {
    name: string;
    schema: Schema<IFavoriteSchool, import("mongoose").Model<IFavoriteSchool, any, any, any, import("mongoose").Document<unknown, any, IFavoriteSchool> & IFavoriteSchool & {
        _id: Types.ObjectId;
    }, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IFavoriteSchool, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<IFavoriteSchool>> & import("mongoose").FlatRecord<IFavoriteSchool> & {
        _id: Types.ObjectId;
    }>;
};
