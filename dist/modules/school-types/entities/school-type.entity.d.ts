import { Schema } from 'mongoose';
import { ISchoolType } from '../interface';
export declare const SchoolTypeModel: {
    name: string;
    schema: Schema<ISchoolType, import("mongoose").Model<ISchoolType, any, any, any, import("mongoose").Document<unknown, any, ISchoolType> & ISchoolType & {
        _id: import("mongoose").Types.ObjectId;
    }, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ISchoolType, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ISchoolType>> & import("mongoose").FlatRecord<ISchoolType> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
};
