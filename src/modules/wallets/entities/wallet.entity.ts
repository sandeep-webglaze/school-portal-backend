import { Schema, Types } from 'mongoose';

import { USERS_WALLETS_MODEL, USER_MODEL } from '@/src/lib/constants';
import { IWallet } from '../interface';

const WalletSchema = new Schema<IWallet>({
    amount: { type: Number, default: 0 },
    user: { type: Types.ObjectId, required: true, ref: USER_MODEL, unique: true },
    lastPaymentAt: { type: Date }
}, { strict: true, strictQuery: true, timestamps: true });

export const WalletModel = { name: USERS_WALLETS_MODEL, schema: WalletSchema };
