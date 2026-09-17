import { Transform } from 'class-transformer';
import { ArrayMinSize, ArrayUnique, IsBoolean, IsEnum, IsMongoId, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { slugify } from '@/src/lib/utils';
import { SLUG_TYPE } from '@/src/lib/constants';
import { PaginateParamDto } from '@/src/lib/shared';
import { ISlug } from '../interface';
import { SlugSchoolFilterDto } from './create-slug.dto';

export class SlugFilterDto extends PaginateParamDto implements Partial<ISlug>, Omit<SlugSchoolFilterDto, 'city' | 'type' | 'classification' | 'schoolBoard'>{
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => slugify(value))
  slug?: string;

  @ApiProperty({ required: false, type: Boolean })
  @IsOptional()
  @Transform(({ value }) => {
    return value.toString() == 'true';
  })
  @IsBoolean()
  isHomepageSlug?: boolean;

  @ApiProperty({ required: false, isArray: true, minimum: 1 })
  @IsOptional()
  @ArrayUnique()
  @IsMongoId({ each: true })
  @ArrayMinSize(1)
  @Transform(({ value }) => {
    if (!Array.isArray(value)) return [value];
    return value;
  })
  type?: string[];

  @ApiProperty({ required: false, isArray: true, minimum: 1 })
  @IsOptional()
  @ArrayUnique()
  @IsMongoId({ each: true })
  @ArrayMinSize(1)
  @Transform(({ value }) => {
    if (!Array.isArray(value)) return [value];
    return value;
  })
  classification?: string[];

  @ApiProperty({ required: false, isArray: true, minimum: 1 })
  @IsOptional()
  @ArrayUnique()
  @IsMongoId({ each: true })
  @ArrayMinSize(1)
  @Transform(({ value }) => {
    if (!Array.isArray(value)) return [value];
    return value;
  })
  city?: string[];

  @ApiProperty({ required: false, isArray: true, minimum: 1 })
  @IsOptional()
  @ArrayUnique()
  @IsMongoId({ each: true })
  @ArrayMinSize(1)
  @Transform(({ value }) => {
    if (!Array.isArray(value)) return [value];
    return value;
  })
  schoolBoard?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsMongoId()
  school?: string;

  @ApiProperty({ required: false, enum: SLUG_TYPE })
  @IsOptional()
  @IsEnum(SLUG_TYPE)
  slugType?: SLUG_TYPE;
}
