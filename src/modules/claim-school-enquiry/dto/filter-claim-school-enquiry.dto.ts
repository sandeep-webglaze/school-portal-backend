import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { PaginateParamDto } from "@/src/lib/shared";
import { IClaimSchoolEnquiry } from "../interface";

export class FilterClaimSchoolEnquiryDto extends PaginateParamDto implements Partial<IClaimSchoolEnquiry> {
    @ApiProperty({ required: false, description: "name of user which request enquiry" })
    @IsOptional()
    @IsString()
    name: string;

    @ApiProperty({ required: false, description: "email of user" })
    @IsOptional()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ required: false, description: "school name" })
    @IsOptional()
    @IsString()
    school: string;
}
