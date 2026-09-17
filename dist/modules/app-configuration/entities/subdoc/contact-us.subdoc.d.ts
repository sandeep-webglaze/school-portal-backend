import { Schema } from "mongoose";
import { IContactUs } from "../../interface";
export declare const ContactUsSchema: Schema<IContactUs, import("mongoose").Model<IContactUs, any, any, any, import("mongoose").Document<unknown, any, IContactUs> & IContactUs & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IContactUs, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<IContactUs>> & import("mongoose").FlatRecord<IContactUs> & {
    _id: import("mongoose").Types.ObjectId;
}>;
