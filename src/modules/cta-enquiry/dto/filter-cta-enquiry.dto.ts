import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';
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
  @IsPhoneNumber('IN')
  phoneNumber: string;
}
