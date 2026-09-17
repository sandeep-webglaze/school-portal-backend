import { IsMongoId, IsPositive, Length, Max } from "class-validator";
import { Types } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

import { ISchoolReview } from "../interface";

export class CreateSchoolReviewDto implements Omit<ISchoolReview, 'user'> {
    @ApiProperty({ required: true, type: String, example: new Types.ObjectId(), description: "School id" })
    @IsMongoId()
    schoolId: string | Types.ObjectId;

    @ApiProperty({ required: true, type: Number, maximum: 5, minimum: 1, description: 'Academics Rating for school' })
    @IsPositive()
    @Max(5)
    academics: number;

    @ApiProperty({ required: true, type: Number, maximum: 5, minimum: 1, description: 'Infrastructure Rating for school' })
    @IsPositive()
    @Max(5)
    infrastructure: number;

    @ApiProperty({ required: true, type: Number, maximum: 5, minimum: 1, description: 'Admission Rating for school' })
    @IsPositive()
    @Max(5)
    addmission: number;

    @ApiProperty({ required: true, type: Number, maximum: 5, minimum: 1, description: 'Extra Curricular Activity Rating for school' })
    @IsPositive()
    @Max(5)
    extracurriclar: number;

    @ApiProperty({ required: true, type: Number, maximum: 5, minimum: 1, description: 'Over All Rating for school' })
    @IsPositive()
    @Max(5)
    overallRating: number;

    @ApiProperty({ required: true, maximum: 500, minimum: 2, description: 'Review description for school' })
    @Length(2, 500)
    review: string;
}
