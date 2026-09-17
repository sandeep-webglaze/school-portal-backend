import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { ISchoolType } from "../interface";

export class CreateSchoolTypeDto implements ISchoolType {
    @ApiProperty({ required: true, description: "Name of school type" })
    @IsString()
    @IsNotEmpty()
    name: string;
}
