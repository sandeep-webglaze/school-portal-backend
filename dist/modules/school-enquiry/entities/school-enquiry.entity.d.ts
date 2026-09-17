import { Schema } from 'mongoose';
import { ISchoolEnquiry } from '../interface';
export declare const SchoolEnquiryModel: {
    name: string;
    schema: Schema<ISchoolEnquiry, import("mongoose").Model<ISchoolEnquiry, any, any, any, import("mongoose").Document<unknown, any, ISchoolEnquiry> & ISchoolEnquiry & {
        _id: import("mongoose").Types.ObjectId;
    }, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ISchoolEnquiry, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ISchoolEnquiry>> & import("mongoose").FlatRecord<ISchoolEnquiry> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
};
