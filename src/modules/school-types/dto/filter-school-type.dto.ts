import { IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { PaginateParamDto } from "@/src/lib/shared";
import { ISchoolType } from "../interface";

export class SchoolTypeFilterDto extends PaginateParamDto implements Partial<ISchoolType> {
    @ApiProperty({ required: false, description: "Name of school type" })
    @IsOptional()
    @IsString()
    name?: string;
}