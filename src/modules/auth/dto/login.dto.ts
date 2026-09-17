import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';

import {
  CreateUserDto,
  UserRegistrationDto,
} from '../../user/dto/create-user.dto';
import { CreateDeleteAccountRequestDto } from '../../delete-account-requests/dto/create-delete-account-request.dto';

export class LoginDto extends PickType(CreateUserDto, ['mail']) {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 'Sam_Password_32!#',
    description: 'user password for further authentication',
  })
  password: string;
}

// #######     DTO for forgot password     #######

export class ForgotDto extends PickType(CreateUserDto, ['mail']) {}

export class CreateForgotSessionDto extends PickType(UserRegistrationDto, [
  'mail',
  'otp',
]) {}

export class ResetPasswordDto extends PickType(CreateUserDto, ['password']) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  token: string;
}

export class OtpLoginDto extends PickType(UserRegistrationDto, [
  'name',
  'phoneNumber',
  'otp',
  'role',
  'verificationStatus',
]) {}

export class OtpLoginDtoFireBase extends PickType(UserRegistrationDto, [
  'name',
  'phoneNumber',
  'role',
  'verificationStatus',
]) {
  @ApiProperty({
    example: 'firebase_token',
    description: 'Firebase token for authentication',
  })
  @IsString()
  @IsNotEmpty()
  idToken: string;
}

export class OtpLoginDtoFireBaseGoogle extends PickType(UserRegistrationDto, [
  'name',
  'mail',
  'imageUrl',
  'role',
  'verificationStatus',
]) {
  @ApiProperty({
    example: 'firebase_token',
    description: 'Firebase token for authentication',
  })
  @IsString()
  @IsNotEmpty()
  idToken: string;
}
