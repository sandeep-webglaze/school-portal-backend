import { Schema } from 'mongoose';
import { INewsletter } from '../interface';
export declare const NewsletterSchema: Schema<INewsletter, import("mongoose").Model<INewsletter, any, any, any, import("mongoose").Document<unknown, any, INewsletter> & INewsletter & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, INewsletter, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<INewsletter>> & import("mongoose").FlatRecord<INewsletter> & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const NewsletterModel: {
    name: string;
    schema: Schema<INewsletter, import("mongoose").Model<INewsletter, any, any, any, import("mongoose").Document<unknown, any, INewsletter> & INewsletter & {
        _id: import("mongoose").Types.ObjectId;
    }, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, INewsletter, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<INewsletter>> & import("mongoose").FlatRecord<INewsletter> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
};
