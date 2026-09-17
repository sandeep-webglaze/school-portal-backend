import { Document } from "mongoose";

import { IUserDocument } from "../user/interface";

export interface IWallet {
    user: string | IUserDocument,
    amount: number,
    lastPaymentAt?: Date,
}
export type IWalletDocument = IWallet & Document;
