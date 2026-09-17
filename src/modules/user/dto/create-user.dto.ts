import { Types } from 'mongoose';
import {
  Equals,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import {
  PLATFORMS,
  USER_ROLE,
  USER_STATUS,
  USER_VERIFICATION_STATUS,
} from '@/src/lib/constants';
import { IUser } from '../interface';

export class CreateUserDto implements IUser {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, example: 'Sam', description: 'name of user' })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 'Sam@mail.com',
    description: 'email of user',
  })
  mail: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 'Sam_Password_32!#',
    description: 'user password for further authentication',
  })
  password: string;

  @IsPhoneNumber('IN')
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: '9222443377',
    description: 'user phone number',
  })
  phoneNumber: string;

  @IsOptional()
  @IsEnum(USER_STATUS)
  @ApiProperty({
    required: false,
    enum: USER_STATUS,
    example: USER_STATUS.ACTIVE,
    default: USER_STATUS.ACTIVE,
    description: 'status of user',
  })
  status: USER_STATUS;

  @IsOptional()
  @IsEnum(USER_VERIFICATION_STATUS)
  @ApiProperty({
    required: false,
    enum: USER_VERIFICATION_STATUS,
    example: USER_VERIFICATION_STATUS.PENDING,
    default: USER_VERIFICATION_STATUS.PENDING,
    description: 'verification status of user account',
  })
  verificationStatus: USER_VERIFICATION_STATUS;

  @IsEnum(USER_ROLE)
  @ApiProperty({
    required: true,
    enum: USER_ROLE,
    example: USER_ROLE.USER,
    description: 'role of user',
  })
  role: USER_ROLE;

  @ApiProperty({ required: false, description: 'profile image of user' })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({
    required: false,
    enum: PLATFORMS,
    description: 'platform from where user is being registered',
  })
  @IsOptional()
  @IsEnum(PLATFORMS)
  platform?: PLATFORMS;
}

export class UserRegistrationDto extends CreateUserDto {
  @ApiProperty({
    required: true,
    example: '1234',
    description: 'OTP which is sent to user contact details',
  })
  @IsString()
  @IsNotEmpty()
  otp: string;

  @ApiProperty({
    required: false,
    enum: USER_VERIFICATION_STATUS,
    example: USER_VERIFICATION_STATUS.VERIFIED,
    default: USER_VERIFICATION_STATUS.VERIFIED,
    description: 'verification status of user account',
  })
  @IsOptional()
  @Equals(USER_VERIFICATION_STATUS.VERIFIED)
  verificationStatus: USER_VERIFICATION_STATUS =
    USER_VERIFICATION_STATUS.VERIFIED;

  @ApiProperty({
    required: false,
    enum: USER_ROLE,
    example: USER_ROLE.USER,
    default: USER_ROLE.USER,
    description: 'role of user',
  })
  @IsOptional()
  @Equals(USER_ROLE.USER)
  role: USER_ROLE = USER_ROLE.USER;
}

export class SchoolUserRegistrationDto extends CreateUserDto {
  @ApiProperty({
    required: true,
    example: new Types.ObjectId(),
    description: 'school id if user is school user',
  })
  @IsMongoId()
  school: string;

  @ApiProperty({
    required: false,
    enum: USER_VERIFICATION_STATUS,
    example: USER_VERIFICATION_STATUS.PENDING,
    default: USER_VERIFICATION_STATUS.PENDING,
    description: 'verification status of user account',
  })
  @IsOptional()
  @Equals(USER_VERIFICATION_STATUS.PENDING)
  verificationStatus: USER_VERIFICATION_STATUS =
    USER_VERIFICATION_STATUS.PENDING;

  @ApiProperty({
    required: false,
    enum: USER_ROLE,
    example: USER_ROLE.SCHOOL_ADMIN,
    default: USER_ROLE.SCHOOL_ADMIN,
    description: 'role of user',
  })
  @IsOptional()
  @Equals(USER_ROLE.SCHOOL_ADMIN)
  role: USER_ROLE = USER_ROLE.SCHOOL_ADMIN;
}
