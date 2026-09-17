import { Schema, Types } from 'mongoose';

import { TRANSACTION_MODEL, TRANSACTION_STATUS, TRANSACTION_TYPE, USER_MODEL } from '@/src/lib/constants';
import { ITransaction } from '../interface';
import { PurchasedLeadSchema } from './subdoc/purchase_lead.subdoc';

const TransactionSchema = new Schema<ITransaction>({
    transactionId: { type: String, required: true, unique: true },
    paymentMethod: { type: String, required: true },
    amount: { type: Number, required: true },
    user: { type: Types.ObjectId, required: true, ref: USER_MODEL },
    type: { type: String, enum: Object.values(TRANSACTION_TYPE), required: true },
    status: { type: String, enum: Object.values(TRANSACTION_STATUS), default: TRANSACTION_STATUS.PENDING },
    timestamp: { type: Date, required: true },
    orderId: { type: String },
    description: { type: String },
    leads: { type: [PurchasedLeadSchema] },
}, { strict: true, strictQuery: true, timestamps: true });

export const TransactionModel = { name: TRANSACTION_MODEL, schema: TransactionSchema };
