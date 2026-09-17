import { Schema, Types } from "mongoose";
import { IPurchasedLeads } from "../../interface";
export declare const PurchasedLeadSchema: Schema<IPurchasedLeads, import("mongoose").Model<IPurchasedLeads, any, any, any, import("mongoose").Document<unknown, any, IPurchasedLeads> & IPurchasedLeads & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IPurchasedLeads, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<IPurchasedLeads>> & import("mongoose").FlatRecord<IPurchasedLeads> & {
    _id: Types.ObjectId;
}>;
