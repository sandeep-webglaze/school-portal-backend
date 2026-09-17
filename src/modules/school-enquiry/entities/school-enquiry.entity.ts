import { Schema } from 'mongoose';

import {
  CITY_MODEL,
  GENDER,
  SCHOOL_ENQUIRY_MODEL,
  SCHOOL_ENQUIRY_STATUS,
  SCHOOL_TYPE_MODEL,
} from '@/src/lib/constants';
import { ISchoolEnquiry } from '../interface';

const SchoolEnquirySchema = new Schema<ISchoolEnquiry>(
  {
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
    userIp: { type: String, required: true },
    pageUrl: { type: String, required: true },
    submittedAt: { type: Date, default: Date.now() },
    gender: { type: String, enum: Object.values(GENDER), required: true },
    status: {
      type: String,
      enum: Object.values(SCHOOL_ENQUIRY_STATUS),
      default: SCHOOL_ENQUIRY_STATUS.PENDING,
    },
    platform: { type: String },
    message: { type: String },
  },
  { strict: true, strictQuery: true, timestamps: true },
);

export const SchoolEnquiryModel = {
  name: SCHOOL_ENQUIRY_MODEL,
  schema: SchoolEnquirySchema,
};
