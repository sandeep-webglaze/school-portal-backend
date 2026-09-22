import { IsOptional, Matches, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { PaginateParamDto } from '@/src/lib/shared';
import { ICTAEnquiry } from '../interface';

export class CtaEnquiryFilterDto
  extends PaginateParamDto
  implements ICTAEnquiry
{
  pageUrl: string;
  @ApiProperty({ required: false, description: 'name of user' })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ required: false, description: 'phone number of user' })
  @IsOptional()
  @Matches(/^\+?[0-9\s()-]{6,20}$/, { message: 'Please enter a valid phone number' })
  phoneNumber: string;
}
