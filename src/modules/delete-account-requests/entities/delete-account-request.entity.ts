import { Schema, Types } from 'mongoose';

import { USER_MODEL, DELETE_ACCOUNT_REQUESTS_MODEL } from '@/src/lib/constants';
import { IDeleteAccountRequest } from '../interface';

const DeleteAccountRequestSchema = new Schema<IDeleteAccountRequest>({
    userId: { type: Schema.Types.ObjectId, ref: USER_MODEL, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    reason: { type: String },
}, { strict: true, strictQuery: true, timestamps: true });

export const DeleteAccountRequestModel = { name: DELETE_ACCOUNT_REQUESTS_MODEL, schema: DeleteAccountRequestSchema };
