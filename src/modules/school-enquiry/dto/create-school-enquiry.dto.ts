import { Types } from 'mongoose';
import {
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  Matches,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { GENDER, SCHOOL_ENQUIRY_STATUS } from '@/src/lib/constants';
import { ISchoolEnquiry } from '../interface';

export class CreateSchoolEnquiryDto implements Omit<ISchoolEnquiry, 'userIp'> {
  @ApiProperty({
    required: true,
    example: 'Sam',
    description: 'parents child name',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    required: true,
    example: 'Sam@mail.com',
    description: 'contact email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    required: true,
    example: '1234567890',
    description: 'contact phone number',
  })
  @Matches(/^\+?[0-9\s()-]{6,20}$/, { message: 'Please enter a valid phone number' })
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    required: true,
    example: new Types.ObjectId(),
    description: 'id of school type for child admission',
  })
  @IsMongoId()
  schoolType: string;

  @ApiProperty({
    required: true,
    example: new Types.ObjectId(),
    description: 'id of city where parents searching for school',
  })
  @IsMongoId()
  city: string;

  @ApiProperty({
    required: true,
    example: '12',
    description: 'class in which parents were seeking admission of their child',
  })
  @IsNotEmpty()
  @IsString()
  class: string;

  @ApiProperty({
    required: true,
    example: 'http://some-url.com',
    description: 'page url from where user filling enquiry form',
  })
  @IsNotEmpty()
  @IsString()
  pageUrl: string;

  @ApiProperty({
    required: false,
    example: '192.168.1.19',
    description: 'user ip from where the request is coming',
  })
  @IsOptional()
  @IsString()
  userIp?: string;

  @ApiProperty({
    required: true,
    enum: GENDER,
    example: GENDER.MALE,
    description: 'Gender of child',
  })
  @IsEnum(GENDER)
  gender: GENDER;

  @ApiProperty({
    required: false,
    enum: SCHOOL_ENQUIRY_STATUS,
    example: SCHOOL_ENQUIRY_STATUS.PENDING,
    default: SCHOOL_ENQUIRY_STATUS.PENDING,
    description: 'enquiry status',
  })
  @IsOptional()
  @IsEnum(SCHOOL_ENQUIRY_STATUS)
  status: SCHOOL_ENQUIRY_STATUS;

  @ApiProperty({
    required: false,
    example: 'hey! i want to discuss about the school near me',
    description: 'user message for school enquiry',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  message?: string;

  submittedAt: Date = new Date();
}
