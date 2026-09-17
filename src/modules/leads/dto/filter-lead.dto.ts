import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsDateString, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { GENDER } from '@/src/lib/constants';
import { PaginateParamDto } from '@/src/lib/shared';
import { ILead } from '../interface';

export class LeadFilterDto extends PaginateParamDto implements Partial<ILead> {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsMongoId()
  schoolType: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsMongoId()
  city: string;

  @ApiProperty({ required: false, enum: GENDER })
  @IsOptional()
  @IsEnum(GENDER)
  gender: GENDER;

  @ApiProperty({ required: false, type: Number, minimum: 1 })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  currentPrice: number;

  @ApiProperty({ required: false, type: Number, minimum: 1 })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  minPrice: number;

  @ApiProperty({ required: false, type: Number, minimum: 1 })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  maxPrice: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  @IsDateString({ strictSeparator: true })
  generatedAt: Date;

  @ApiProperty({ required: false, description: "id of user" })
  @IsOptional()
  @IsMongoId()
  owner?: string;

  @ApiProperty({ required: false, type: Boolean, default: true })
  @IsOptional()
  @Transform(({ value }) => {
    return value.toString() == 'true';
  })
  @IsBoolean()
  purchased: boolean
}
