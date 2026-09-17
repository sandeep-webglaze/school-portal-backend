import { Types } from "mongoose";
import { IsMongoId } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { IFavoriteSchool } from "../interface";

export class CreateFavoriteSchoolDto implements IFavoriteSchool {
    @ApiProperty({ required: true, example: new Types.ObjectId(), description: "id of user" })
    @IsMongoId()
    user: string;

    @ApiProperty({ required: true, example: new Types.ObjectId(), description: "id of school which user want to add to wishlist" })
    @IsMongoId()
    school: string;
}
