import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { PaginateParamDto } from '@/src/lib/shared';

export class NewsletterFilterDto extends PaginateParamDto {
  @ApiProperty({ required: false, description: 'filter by email' })
  @IsOptional()
  @IsString()
  email?: string;
}
