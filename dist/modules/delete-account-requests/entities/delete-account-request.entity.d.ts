import { Schema, Types } from 'mongoose';
import { IDeleteAccountRequest } from '../interface';
export declare const DeleteAccountRequestModel: {
    name: string;
    schema: Schema<IDeleteAccountRequest, import("mongoose").Model<IDeleteAccountRequest, any, any, any, import("mongoose").Document<unknown, any, IDeleteAccountRequest> & IDeleteAccountRequest & {
        _id: Types.ObjectId;
    }, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IDeleteAccountRequest, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<IDeleteAccountRequest>> & import("mongoose").FlatRecord<IDeleteAccountRequest> & {
        _id: Types.ObjectId;
    }>;
};
