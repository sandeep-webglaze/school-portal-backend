import { Schema } from 'mongoose';
import { ISchoolReview } from '../interface';
export declare const SchoolReviewModel: {
    name: string;
    schema: Schema<ISchoolReview, import("mongoose").Model<ISchoolReview, any, any, any, import("mongoose").Document<unknown, any, ISchoolReview> & ISchoolReview & {
        _id: import("mongoose").Types.ObjectId;
    }, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ISchoolReview, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ISchoolReview>> & import("mongoose").FlatRecord<ISchoolReview> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
};
