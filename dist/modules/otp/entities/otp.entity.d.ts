import { Schema } from 'mongoose';
import { IOtp } from '../interface';
export declare const OtpSchema: Schema<IOtp, import("mongoose").Model<IOtp, any, any, any, import("mongoose").Document<unknown, any, IOtp> & IOtp & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IOtp, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<IOtp>> & import("mongoose").FlatRecord<IOtp> & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const OtpModel: {
    name: string;
    schema: Schema<IOtp, import("mongoose").Model<IOtp, any, any, any, import("mongoose").Document<unknown, any, IOtp> & IOtp & {
        _id: import("mongoose").Types.ObjectId;
    }, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IOtp, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<IOtp>> & import("mongoose").FlatRecord<IOtp> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
};
