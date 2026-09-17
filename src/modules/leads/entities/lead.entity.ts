import { Schema, Types } from 'mongoose';

import { CITY_MODEL, GENDER, LEAD_MODEL, SCHOOL_TYPE_MODEL, USER_MODEL } from '@/src/lib/constants';
import { ILead } from '../interface';

const LeadSchema = new Schema<ILead>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    schoolType: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: SCHOOL_TYPE_MODEL,
    },
    city: { type: Schema.Types.ObjectId, required: true, ref: CITY_MODEL },
    class: { type: String, required: true },
    gender: { type: String, enum: Object.values(GENDER), required: true },
    actualPrice: { type: Number, required: true },
    currentPrice: { type: Number, required: true },
    generatedAt: { type: Date, default: Date.now() },
    freezed: { type: Boolean, default: false },
    owner: { type: Types.ObjectId, ref: USER_MODEL },
}, { strict: true, strictQuery: true, timestamps: true });

export const LeadModel = { name: LEAD_MODEL, schema: LeadSchema };
