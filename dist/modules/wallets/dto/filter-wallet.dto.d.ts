import { PaginateParamDto } from "@/src/lib/shared";
import { IWallet } from "../interface";
export declare class FilterWalletDto extends PaginateParamDto implements Partial<IWallet> {
    user: string;
    minAmount: number;
    maxAmount: number;
}
