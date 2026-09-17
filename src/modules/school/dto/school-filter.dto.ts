import { Transform, Type } from 'class-transformer';
import { ArrayMinSize, ArrayUnique, IsBoolean, IsEnum, IsMongoId, IsObject, IsOptional, IsPositive, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { PaginateParamDto } from '@/src/lib/shared';
import { SortingType } from '@/src/lib/interface';
import { SORTING_TYPE } from '@/src/lib/constants';
import { ISchool } from '../interface';

type ISchoolFilters = Pick<ISchool, 'isFeatured' | 'city' | 'published'>;

class SchoolSortBy implements SortingType<ISchool> {
  @ApiProperty({ required: false, enum: SORTING_TYPE, description: "sort schools by maximum fees" })
  @IsOptional()
  @IsEnum(SORTING_TYPE)
  maxFees?: SORTING_TYPE;

  @ApiProperty({ required: false, enum: SORTING_TYPE, description: "sort schools by minimum fees" })
  @IsOptional()
  @IsEnum(SORTING_TYPE)
  minFees?: SORTING_TYPE;

  @ApiProperty({ required: false, enum: SORTING_TYPE, description: "sort schools by average ratings" })
  @IsOptional()
  @IsEnum(SORTING_TYPE)
  avgRating?: SORTING_TYPE;

  @ApiProperty({ required: false, enum: SORTING_TYPE, description: "sort schools by their created at date" })
  @IsOptional()
  @IsEnum(SORTING_TYPE)
  createdAt?: SORTING_TYPE;

  @ApiProperty({ required: false, enum: SORTING_TYPE, description: "sort schools such that featured followed by non featured" })
  @IsOptional()
  @IsEnum(SORTING_TYPE)
  isFeatured?: SORTING_TYPE;
}

export class SchoolFilterDto extends PaginateParamDto implements ISchoolFilters {
  @ApiProperty({ required: false, isArray: true, minimum: 1 })
  @IsOptional()
  @ArrayUnique()
  @IsMongoId({ each: true })
  @ArrayMinSize(1)
  @Transform(({ value }) => {
    if (!Array.isArray(value)) return [value];
    return value;
  })
  includeId?: string[];

  @ApiProperty({ required: false, isArray: true, minimum: 1 })
  @IsOptional()
  @ArrayUnique()
  @IsMongoId({ each: true })
  @ArrayMinSize(1)
  @Transform(({ value }) => {
    if (!Array.isArray(value)) return [value];
    return value;
  })
  excludeId?: string[];

  @ApiProperty({ required: false, description: "user id if for wish listed school flag" })
  @IsOptional()
  @IsMongoId()
  userId?: string;

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
  schoolBoards?: string[];

  @ApiProperty({ required: false, type: Number, minimum: 1, example: 1200 })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  minFees: number;

  @ApiProperty({ required: false, type: Number, minimum: 1, example: 1400 })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  maxFees: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  categorySlug?: string;

  @ApiProperty({ required: false, type: Boolean })
  @IsOptional()
  @Transform(({ value }) => {
    return value.toString() == 'true';
  })
  @IsBoolean()
  isFeatured: boolean;

  @ApiProperty({ required: false, type: Boolean, default: true })
  @IsOptional()
  @Transform(({ value }) => {
    return value.toString() == 'true';
  })
  @IsBoolean()
  published: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsMongoId()
  city: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false, type: SchoolSortBy })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => SchoolSortBy)
  sortBy: SchoolSortBy;
}
