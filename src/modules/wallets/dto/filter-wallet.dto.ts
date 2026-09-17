import { Types } from "mongoose";
import { Type } from "class-transformer";
import { IsMongoId, IsOptional, IsPositive } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { PaginateParamDto } from "@/src/lib/shared";
import { IWallet } from "../interface";

export class FilterWalletDto extends PaginateParamDto implements Partial<IWallet> {
    @ApiProperty({ required: true, example: new Types.ObjectId(), description: "id of user" })
    @IsOptional()
    @IsMongoId()
    user: string;

    @ApiProperty({ required: false, type: Number, minimum: 1 })
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    minAmount: number;

    @ApiProperty({ required: false, type: Number, minimum: 1 })
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    maxAmount: number;
}
