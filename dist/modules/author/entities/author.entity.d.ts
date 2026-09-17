import { Schema } from 'mongoose';
import { IAuthor } from '../interface';
export declare const AuthorModel: {
    name: string;
    schema: Schema<IAuthor, import("mongoose").Model<IAuthor, any, any, any, import("mongoose").Document<unknown, any, IAuthor> & IAuthor & {
        _id: import("mongoose").Types.ObjectId;
    }, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IAuthor, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<IAuthor>> & import("mongoose").FlatRecord<IAuthor> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
};
