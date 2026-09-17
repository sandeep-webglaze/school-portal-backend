import { IsDateString, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { PaginateParamDto } from "@/src/lib/shared";
import { TRANSACTION_STATUS, TRANSACTION_TYPE } from "@/src/lib/constants";
import { ITransaction } from "../interface";

export class TransactionFilter extends PaginateParamDto implements Partial<ITransaction>{
    @ApiProperty({ required: false })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    transactionId?: string;

    @ApiProperty()
    @IsMongoId()
    @IsOptional()
    user?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    paymentMethod?: string;

    @ApiProperty()
    @IsOptional()
    @IsEnum(TRANSACTION_TYPE)
    type?: TRANSACTION_TYPE;

    @ApiProperty()
    @IsOptional()
    @IsEnum(TRANSACTION_STATUS)
    status?: TRANSACTION_STATUS;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNotEmpty()
    @IsDateString({ strictSeparator: true })
    from?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNotEmpty()
    @IsDateString({ strictSeparator: true })
    to?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    orderId?: string;
}