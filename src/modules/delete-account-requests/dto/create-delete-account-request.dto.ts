import { Types } from "mongoose";
import { IsEmail, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { IDeleteAccountRequest } from "../interface";

export class CreateDeleteAccountRequestDto implements Pick<IDeleteAccountRequest, 'reason'> {
    @ApiProperty({ required: false, example: "I just want to delete my account", description: "Reason of user for deleting account" })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    reason?: string;
}
