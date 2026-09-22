import { IsEmail, IsNotEmpty, Matches, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { IClaimSchoolEnquiry } from '../interface';

export class CreateClaimSchoolEnquiryDto implements IClaimSchoolEnquiry {
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
    example: 'The xyz public school',
    description: "School name which user want's to claim",
  })
  @IsNotEmpty()
  @IsString()
  school: string;

  @ApiProperty({
    required: true,
    example: 'delhi',
    description: "School Address which user want's to claim",
  })
  @IsNotEmpty()
  @IsString()
  schoolAddress: string;
}
