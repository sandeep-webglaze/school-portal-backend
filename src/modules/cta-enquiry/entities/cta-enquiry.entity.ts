import { Schema } from "mongoose";

import { CTA_ENQUIRY_MODEL } from "@/src/lib/constants";
import { ICTAEnquiry } from "../interface";

export const CTAEnquirySchema = new Schema<ICTAEnquiry>({
    phoneNumber: { type: String, required: true },
    name: { type: String, required: true },
    pageUrl:{type:String,required:true},
}, { timestamps: true });

export const CTAEnquiryModel = { name: CTA_ENQUIRY_MODEL, schema: CTAEnquirySchema };
