import { Schema, Types } from 'mongoose';
import { ISchoolRequest } from '../interface';
export declare const SchoolRequestModel: {
    name: string;
    schema: Schema<ISchoolRequest, import("mongoose").Model<ISchoolRequest, any, any, any, import("mongoose").Document<unknown, any, ISchoolRequest> & ISchoolRequest & {
        _id: Types.ObjectId;
    }, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ISchoolRequest, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ISchoolRequest>> & import("mongoose").FlatRecord<ISchoolRequest> & {
        _id: Types.ObjectId;
    }>;
};
