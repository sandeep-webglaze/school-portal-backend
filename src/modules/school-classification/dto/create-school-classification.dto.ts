import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { ISchoolClassification } from "../interface";

export class CreateSchoolClassificationDto implements ISchoolClassification {
    @ApiProperty({ required: true, description: "name of the classification" })
    @IsString()
    @IsNotEmpty()
    name: string;
}
