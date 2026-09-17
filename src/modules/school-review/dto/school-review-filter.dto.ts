import { IsMongoId, IsOptional, IsPositive, Max } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

import { PaginateParamDto } from "@/src/lib/shared";
import { ISchoolReview } from "../interface";

export class SchoolReviewFilterDto extends PaginateParamDto implements Partial<ISchoolReview> {
    @ApiProperty({ required: false, description: "User id" })
    @IsOptional()
    @IsMongoId()
    user: string;

    @ApiProperty({ required: false, description: "School id" })
    @IsOptional()
    @IsMongoId()
    schoolId: string;

    @ApiProperty({ required: false, type: Number, minimum: 1, maximum: 5, description: "Minimum academic rating" })
    @IsOptional()
    @IsPositive()
    @Max(5)
    @Type(() => Number)
    academics: number;

    @ApiProperty({ required: false, type: Number, minimum: 1, maximum: 5, description: "Minimum infrastructure rating" })
    @IsOptional()
    @IsPositive()
    @Max(5)
    @Type(() => Number)
    infrastructure: number;

    @ApiProperty({ required: false, type: Number, minimum: 1, maximum: 5, description: "Minimum admission rating" })
    @IsOptional()
    @IsPositive()
    @Max(5)
    @Type(() => Number)
    addmission: number;

    @ApiProperty({ required: false, type: Number, minimum: 1, maximum: 5, description: "Minimum extracurricular rating" })
    @IsOptional()
    @IsPositive()
    @Max(5)
    @Type(() => Number)
    extracurriclar: number;

    @ApiProperty({ required: false, type: Number, minimum: 1, maximum: 5, description: "Minimum over all rating" })
    @IsOptional()
    @IsPositive()
    @Max(5)
    @Type(() => Number)
    overallRating: number;
}
