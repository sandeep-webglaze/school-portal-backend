import { Schema } from 'mongoose';

import { CLAIM_SCHOOL_ENQUIRY_MODEL } from '@/src/lib/constants';
import { IClaimSchoolEnquiry } from '../interface';

const ClaimSchoolEnquirySchema = new Schema<IClaimSchoolEnquiry>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    school: { type: String, required: true },
    schoolAddress: { type: String, required: true },
  },
  { strict: true, strictQuery: true, timestamps: true },
);

export const ClaimSchoolEnquiryModel = {
  name: CLAIM_SCHOOL_ENQUIRY_MODEL,
  schema: ClaimSchoolEnquirySchema,
};
