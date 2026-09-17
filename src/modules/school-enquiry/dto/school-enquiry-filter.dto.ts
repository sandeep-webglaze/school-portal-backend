import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { PLATFORMS, GENDER, SCHOOL_ENQUIRY_STATUS } from '@/src/lib/constants';
import { PaginateParamDto } from '@/src/lib/shared';
import { ISchoolEnquiry } from '../interface';

export class SchoolEnquiryFilterDto
  extends PaginateParamDto
  implements Partial<ISchoolEnquiry>
{
  @ApiProperty({
    required: false,
    description: 'name of user which request enquiry',
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ required: false, description: 'email of user' })
  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ required: false, isArray: true, minimum: 1 })
  @IsOptional()
  @IsMongoId()
  schoolType: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsMongoId()
  city: string;

  @ApiProperty({ required: false, enum: GENDER })
  @IsOptional()
  @IsEnum(GENDER)
  gender: GENDER;

  @ApiProperty({ required: false, enum: SCHOOL_ENQUIRY_STATUS })
  @IsOptional()
  @IsEnum(SCHOOL_ENQUIRY_STATUS)
  status: SCHOOL_ENQUIRY_STATUS;

  @ApiProperty({ required: false, description: 'user ip' })
  @IsOptional()
  @IsString()
  userIp: string;

  @ApiProperty({ required: false, description: 'some page url' })
  @IsOptional()
  @IsString()
  pageUrl: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  @IsDateString({ strictSeparator: true })
  submittedAt: Date;

  @ApiProperty({ required: false, enum: PLATFORMS })
  @IsOptional()
  @IsEnum(PLATFORMS)
  platform: PLATFORMS;
}
