import { Schema } from 'mongoose';
import { ISchoolClassification } from '../interface';
export declare const SchoolClassificationModel: {
    name: string;
    schema: Schema<ISchoolClassification, import("mongoose").Model<ISchoolClassification, any, any, any, import("mongoose").Document<unknown, any, ISchoolClassification> & ISchoolClassification & {
        _id: import("mongoose").Types.ObjectId;
    }, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ISchoolClassification, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ISchoolClassification>> & import("mongoose").FlatRecord<ISchoolClassification> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
};
