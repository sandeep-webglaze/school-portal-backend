import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";

export class PaginateParamDto {
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    @ApiProperty({ required: false, type: Number, description: "Current page" })
    page: number;

    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    @ApiProperty({ required: false, type: Number, description: "Number of data return" })
    limit: number;
}
