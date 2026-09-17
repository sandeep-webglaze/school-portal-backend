import { Schema } from 'mongoose';
import { ISlug } from '../interface';
export declare const SlugModel: {
    name: string;
    schema: Schema<ISlug, import("mongoose").Model<ISlug, any, any, any, import("mongoose").Document<unknown, any, ISlug> & ISlug & {
        _id: import("mongoose").Types.ObjectId;
    }, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ISlug, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ISlug>> & import("mongoose").FlatRecord<ISlug> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
};
