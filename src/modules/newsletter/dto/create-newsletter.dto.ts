import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNewsletterDto {
  @ApiProperty({ required: true, example: 'parent@example.com', description: 'subscriber email' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
