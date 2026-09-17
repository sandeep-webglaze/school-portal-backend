/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Document } from "mongoose";
import { TRANSACTION_STATUS, TRANSACTION_TYPE } from "@/src/lib/constants";
import { IUserDocument } from "../user/interface";
import { ILeadDocument } from "../leads/interface";
export interface IPurchasedLeads {
    lead: string | ILeadDocument;
    price: number;
}
export interface ITransaction {
    transactionId: string;
    paymentMethod: string;
    amount: number;
    user: string | IUserDocument;
    type: TRANSACTION_TYPE;
    status: TRANSACTION_STATUS;
    timestamp: Date;
    orderId?: string;
    description?: string;
    leads?: IPurchasedLeads[];
}
export type ITransactionDocument = ITransaction & Document;
