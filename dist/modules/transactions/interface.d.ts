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
