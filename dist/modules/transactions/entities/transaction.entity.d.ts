import { Schema, Types } from 'mongoose';
import { ITransaction } from '../interface';
export declare const TransactionModel: {
    name: string;
    schema: Schema<ITransaction, import("mongoose").Model<ITransaction, any, any, any, import("mongoose").Document<unknown, any, ITransaction> & ITransaction & {
        _id: Types.ObjectId;
    }, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ITransaction, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ITransaction>> & import("mongoose").FlatRecord<ITransaction> & {
        _id: Types.ObjectId;
    }>;
};
