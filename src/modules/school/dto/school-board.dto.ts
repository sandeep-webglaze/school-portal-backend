import { Transform } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty, PartialType } from "@nestjs/swagger";

import { PaginateParamDto } from "@/src/lib/shared";
import { ISchoolBoard } from "../interface";

export class CreateSchoolBoardDto implements ISchoolBoard {
    @ApiProperty({ required: true, description: "Board name" })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ required: false, type: Boolean, default: false, description: "Featured flag for school board" })
    @IsOptional()
    @IsBoolean()
    featured: boolean;
}

export class UpdateSchoolBoardDto extends PartialType(CreateSchoolBoardDto) { }

export class SchoolBoardFilterDto extends PaginateParamDto implements Partial<ISchoolBoard> {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({ required: false, type: Boolean })
    @IsOptional()
    @Transform(({ value }) => {
        return value.toString() == 'true';
    })
    @IsBoolean()
    featured: boolean;
}