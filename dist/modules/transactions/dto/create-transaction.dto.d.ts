import { TRANSACTION_TYPE } from "@/src/lib/constants";
import { IUserDocument } from "../../user/interface";
import { ITransaction } from "../interface";
export declare class CreateTransactionDto implements Omit<ITransaction, 'transactionId' | 'status' | 'leads'> {
    paymentMethod: string;
    amount: number;
    user: string | IUserDocument;
    type: TRANSACTION_TYPE;
    timestamp: Date;
    orderId?: string;
    description?: string;
}
export declare class LeadsTransactions {
    leads: string[];
}
export declare class CreditWalletDto {
    amount: number;
}
