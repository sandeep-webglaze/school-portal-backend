import { Schema, Types } from "mongoose";

import { IPurchasedLeads } from "../../interface";

export const PurchasedLeadSchema = new Schema<IPurchasedLeads>({
    lead: { type: Types.ObjectId, required: true },
    price: { type: Number, required: true }
})