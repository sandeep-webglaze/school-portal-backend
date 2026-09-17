import { Schema, Types } from 'mongoose';
import { ILead } from '../interface';
export declare const LeadModel: {
    name: string;
    schema: Schema<ILead, import("mongoose").Model<ILead, any, any, any, import("mongoose").Document<unknown, any, ILead> & ILead & {
        _id: Types.ObjectId;
    }, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ILead, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ILead>> & import("mongoose").FlatRecord<ILead> & {
        _id: Types.ObjectId;
    }>;
};
