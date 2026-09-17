import { Schema } from 'mongoose';
import { IClaimSchoolEnquiry } from '../interface';
export declare const ClaimSchoolEnquiryModel: {
    name: string;
    schema: Schema<IClaimSchoolEnquiry, import("mongoose").Model<IClaimSchoolEnquiry, any, any, any, import("mongoose").Document<unknown, any, IClaimSchoolEnquiry> & IClaimSchoolEnquiry & {
        _id: import("mongoose").Types.ObjectId;
    }, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IClaimSchoolEnquiry, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<IClaimSchoolEnquiry>> & import("mongoose").FlatRecord<IClaimSchoolEnquiry> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
};
