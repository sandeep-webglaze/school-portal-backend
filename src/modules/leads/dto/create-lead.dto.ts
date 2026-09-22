import { IsDateString, IsEmail, IsEnum, IsMongoId, IsNotEmpty, IsOptional, Matches, IsPositive, IsString } from "class-validator";
import { Types } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

import { GENDER } from "@/src/lib/constants";
import { ISchoolEnquiry } from "../../school-enquiry/interface";
import { ILead } from "../interface";

export class CreateLeadDto implements Omit<ILead, 'freezed'> {
    @ApiProperty({ required: true, example: "Sam", description: "parents child name" })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ required: true, example: "Sam@mail.com", description: "contact email" })
    @IsEmail()
    email: string;

    @ApiProperty({ required: true, example: "1234567890", description: "contact phone number" })
    @Matches(/^\+?[0-9\s()-]{6,20}$/, { message: 'Please enter a valid phone number' })
    @IsNotEmpty()
    phoneNumber: string;

    @ApiProperty({ required: true, example: new Types.ObjectId(), description: "id of school type for child admission" })
    @IsMongoId()
    schoolType: string;

    @ApiProperty({ required: true, example: new Types.ObjectId(), description: "id of city where parents searching for school" })
    @IsMongoId()
    city: string;

    @ApiProperty({ required: true, example: "12", description: "class in which parents were seeking admission of their child" })
    @IsNotEmpty()
    @IsString()
    class: string;

    @IsEnum(GENDER)
    @ApiProperty({ required: true, enum: GENDER, example: GENDER.MALE, description: "Gender of child" })
    gender: GENDER;

    @ApiProperty({ required: false, example: "hey! i want to discuss about the school near me", description: "user message for school enquiry" })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    message?: string;

    @ApiProperty({ required: false, example: 10000, description: "Actual price of lead, this will be calculated if not give" })
    @IsOptional()
    @IsPositive()
    actualPrice: number;

    @ApiProperty({ required: false, example: 10000, description: "Visible price to user,on creation this will be override by actual price" })
    @IsOptional()
    @IsPositive()
    currentPrice: number;

    @ApiProperty({ required: false, example: new Date(), description: "Date when got the lead, default to current time" })
    @IsOptional()
    @IsNotEmpty()
    @IsDateString({ strictSeparator: true })
    generatedAt: Date;

    static create_lead_from_enquiry(enquiry: ISchoolEnquiry) {
        const lead = new CreateLeadDto()

        lead.name = enquiry.name
        lead.email = enquiry.email
        lead.phoneNumber = enquiry.phoneNumber
        lead.class = enquiry.class
        lead.schoolType = enquiry.schoolType.toString()
        lead.city = enquiry.city.toString()
        lead.gender = enquiry.gender
        lead.message = enquiry.message
        lead.generatedAt = enquiry.submittedAt

        return lead;
    }
}
