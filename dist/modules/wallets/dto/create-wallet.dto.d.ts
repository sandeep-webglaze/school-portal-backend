import { IWallet } from "../interface";
export declare class CreateWalletDto implements IWallet {
    user: string;
    amount: number;
    lastPaymentAt?: Date;
}
