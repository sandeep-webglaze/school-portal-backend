import { IsEnum, IsPositive } from "class-validator";
import { ApiProperty, OmitType } from "@nestjs/swagger";

import { WALLET_PAYMENT_TYPE } from "@/src/lib/constants";
import { IWallet } from "../interface";
import { CreateWalletDto } from "./create-wallet.dto";

export class UpdateWalletDto extends OmitType(CreateWalletDto, ['user']) implements Omit<IWallet, 'user'> {
    @ApiProperty({ required: true, enum: WALLET_PAYMENT_TYPE, description: "Type of payment to wallet" })
    @IsEnum(WALLET_PAYMENT_TYPE)
    type: WALLET_PAYMENT_TYPE;

    @ApiProperty({ required: false, default: 0, example: 10000, description: "amount credit/debit in user wallet" })
    @IsPositive()
    amount: number;
}
