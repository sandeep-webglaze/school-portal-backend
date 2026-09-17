import { Schema } from 'mongoose';
import { ISchool } from '../interface';
export declare const SchoolModel: {
    name: string;
    schema: Schema<ISchool, import("mongoose").Model<ISchool, any, any, any, import("mongoose").Document<unknown, any, ISchool> & ISchool & {
        _id: import("mongoose").Types.ObjectId;
    }, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ISchool, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ISchool>> & import("mongoose").FlatRecord<ISchool> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
};
