import { PaginateParamDto } from "@/src/lib/shared";
import { TRANSACTION_STATUS, TRANSACTION_TYPE } from "@/src/lib/constants";
import { ITransaction } from "../interface";
export declare class TransactionFilter extends PaginateParamDto implements Partial<ITransaction> {
    transactionId?: string;
    user?: string;
    paymentMethod?: string;
    type?: TRANSACTION_TYPE;
    status?: TRANSACTION_STATUS;
    from?: string;
    to?: string;
    orderId?: string;
}
