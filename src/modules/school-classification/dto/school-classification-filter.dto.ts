import { IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { PaginateParamDto } from "@/src/lib/shared";
import { ISchoolClassification } from "../interface";

export class SchoolClassificationFilterDto extends PaginateParamDto implements Partial<ISchoolClassification> {
    @ApiProperty({ required: false, description: "name of the classification" })
    @IsOptional()
    @IsString()
    name?: string;
}