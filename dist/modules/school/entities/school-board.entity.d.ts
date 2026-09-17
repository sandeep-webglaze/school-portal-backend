import { Schema } from 'mongoose';
import { ISchoolBoard } from '../interface';
export declare const SchoolBoardModel: {
    name: string;
    schema: Schema<ISchoolBoard, import("mongoose").Model<ISchoolBoard, any, any, any, import("mongoose").Document<unknown, any, ISchoolBoard> & ISchoolBoard & {
        _id: import("mongoose").Types.ObjectId;
    }, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ISchoolBoard, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ISchoolBoard>> & import("mongoose").FlatRecord<ISchoolBoard> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
};
