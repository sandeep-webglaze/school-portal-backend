import { Types } from 'mongoose';
import { IsDateString, IsEmail, IsMobilePhone, IsMongoId, IsNotEmpty, IsOptional, Matches, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { IOtp } from '../interface';

export class SendOtpDto implements Pick<IOtp, 'email' | 'phoneNumber' | 'userId'> {

  @ApiProperty({ required: true, example: "Sam@mail.com", description: "email of user" })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ required: true, example: "9222443377", description: "user phone number" })
  @IsNotEmpty()
  @Matches(/^\+?[0-9\s()-]{6,20}$/, { message: 'Please enter a valid phone number' })
  @Matches(/^\+?[0-9\s()-]{6,20}$/, { message: 'Please enter a valid phone number' })
  phoneNumber: string;

  @ApiProperty({ required: false, example: new Types.ObjectId(), description: "id of user" })
  @IsOptional()
  @IsMongoId()
  userId?: string;
}

export class SendOtpResponse {
  static description = () => 'Sends OTP to given mobile number.';

  @ApiProperty({ required: true, example: "9222443377", description: "user phone number" })
  @IsNotEmpty()
  @Matches(/^\+?[0-9\s()-]{6,20}$/, { message: 'Please enter a valid phone number' })
  phoneNumber: string;

  @ApiProperty({ required: true, example: "Sam@mail.com", description: "email of user" })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  timeout: string;
}
