import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { PaginateParamDto } from "@/src/lib/shared";
import { USER_ROLE, USER_STATUS, USER_VERIFICATION_STATUS } from "@/src/lib/constants";
import { IUser } from "../interface";

export class UserFilterDto extends PaginateParamDto implements Partial<IUser> {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNotEmpty()
    @IsEmail()
    mail: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNotEmpty()
    @IsPhoneNumber('IN')
    phoneNumber: string;

    @ApiProperty({ required: false, enum: USER_ROLE })
    @IsOptional()
    @IsEnum(USER_ROLE)
    role: USER_ROLE;

    @ApiProperty({ required: false, enum: USER_VERIFICATION_STATUS })
    @IsOptional()
    @IsEnum(USER_VERIFICATION_STATUS)
    verificationStatus: USER_VERIFICATION_STATUS;

    @ApiProperty({ required: false, enum: USER_STATUS })
    @IsOptional()
    @IsEnum(USER_STATUS)
    status: USER_STATUS;
}