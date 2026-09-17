import { Schema, Types } from 'mongoose';
import { IWallet } from '../interface';
export declare const WalletModel: {
    name: string;
    schema: Schema<IWallet, import("mongoose").Model<IWallet, any, any, any, import("mongoose").Document<unknown, any, IWallet> & IWallet & {
        _id: Types.ObjectId;
    }, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IWallet, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<IWallet>> & import("mongoose").FlatRecord<IWallet> & {
        _id: Types.ObjectId;
    }>;
};
