import { WALLET_PAYMENT_TYPE } from "@/src/lib/constants";
import { IWallet } from "../interface";
import { CreateWalletDto } from "./create-wallet.dto";
declare const UpdateWalletDto_base: import("@nestjs/common").Type<Omit<CreateWalletDto, "user">>;
export declare class UpdateWalletDto extends UpdateWalletDto_base implements Omit<IWallet, 'user'> {
    type: WALLET_PAYMENT_TYPE;
    amount: number;
}
export {};
