import { IsNotEmpty, Matches, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCtaEnquiryDto {
  @ApiProperty({ required: true, example: 'Sam', description: 'user name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Matches(/^\+?[0-9\s()-]{6,20}$/, { message: 'Please enter a valid phone number' })
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: '1122334455',
    description: 'user phone number',
  })
  phoneNumber: string;

  @ApiProperty({
    required: true,
    example: '/search',
    description: 'user page url',
  })
  @IsNotEmpty()
  @IsString()
  pageUrl: string;
}
