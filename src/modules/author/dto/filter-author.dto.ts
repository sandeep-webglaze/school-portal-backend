import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

import { PaginateParamDto } from '@/src/lib/shared/paginated_param.dto';

export class AuthorFilterDto extends PaginateParamDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  slug: string;

  @ApiProperty({ required: false, type: Boolean })
  @IsOptional()
  @Transform(({ value }) => {
    return value.toString() == 'true';
  })
  @IsBoolean()
  isActive: boolean;
}
