import { Types } from "mongoose";
import { IsDateString, IsMongoId, IsOptional, IsPositive, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { IWallet } from "../interface";

export class CreateWalletDto implements IWallet {
    @ApiProperty({ required: true, example: new Types.ObjectId(), description: "User id for which wallet has been created" })
    @IsMongoId()
    user: string;

    @ApiProperty({ required: false, default: 0, example: 10000, description: "amount in user wallet" })
    @IsOptional()
    @IsPositive()
    amount: number;

    @ApiProperty({ required: false, default: new Date(), example: new Date, description: "recently captured timestamp of wallet transaction" })
    @IsOptional()
    @IsString()
    @IsDateString()
    lastPaymentAt?: Date;
}
