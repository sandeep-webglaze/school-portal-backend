import { ArrayMinSize, ArrayUnique, IsArray, IsDateString, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsPositive, IsString, Max, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { TRANSACTION_TYPE } from "@/src/lib/constants";
import { IUserDocument } from "../../user/interface";
import { ITransaction } from "../interface";
import { Types } from "mongoose";

export class CreateTransactionDto implements Omit<ITransaction, 'transactionId' | 'status' | 'leads'> {
    @ApiProperty({ required: true, example: "razorpay", description: "Method by which payment has done" })
    @IsNotEmpty()
    @IsString()
    paymentMethod: string;

    @ApiProperty({ required: true, type: Number, minimum: 1, description: "Amount credit/debit from wallet" })
    @IsOptional()
    @IsPositive()
    amount: number;

    @ApiProperty()
    @IsMongoId()
    user: string | IUserDocument;

    @ApiProperty({ required: true, enum: TRANSACTION_TYPE, description: "type of transaction" })
    @IsEnum(TRANSACTION_TYPE)
    type: TRANSACTION_TYPE;

    @ApiProperty({ required: true, example: new Date(), default: new Date(), description: "exact timestamp when transaction is done" })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @IsDateString()
    timestamp: Date;

    @ApiProperty({ required: false, description: "unique razorpay order id" })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    orderId?: string;

    @ApiProperty({ required: false, description: "any note or description about payment" })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    description?: string;
}

export class LeadsTransactions {
    @ApiProperty({ required: true, isArray: true, example: [new Types.ObjectId()], description: "Unique list of leads which User wants to buy" })
    @IsArray()
    @ArrayUnique()
    @ArrayMinSize(1)
    @IsMongoId({ each: true })
    leads: string[]
}

export class CreditWalletDto {
    @ApiProperty({ required: true, type: Number, minimum: 1, description: "amount which has to be added to wallet" })
    @IsPositive()
    @Min(1)
    @Max(100000) // 1 lakh
    amount: number;
}
