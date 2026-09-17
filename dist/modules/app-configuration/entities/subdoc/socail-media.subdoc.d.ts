import { Schema } from "mongoose";
import { ISocialMedia } from "../../interface";
export declare const SocialMediaSchema: Schema<ISocialMedia, import("mongoose").Model<ISocialMedia, any, any, any, import("mongoose").Document<unknown, any, ISocialMedia> & ISocialMedia & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ISocialMedia, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ISocialMedia>> & import("mongoose").FlatRecord<ISocialMedia> & {
    _id: import("mongoose").Types.ObjectId;
}>;
