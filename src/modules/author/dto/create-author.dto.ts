import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { slugify } from '@/src/lib/utils';
import { IAuthor, IAuthorCard, IAuthorStat } from '../interface';

export class AuthorStatDto implements IAuthorStat {
  @ApiProperty({ required: true, example: '2,000+' })
  @IsString()
  value: string;

  @ApiProperty({ required: true, example: 'School visits' })
  @IsString()
  label: string;
}

export class AuthorCardDto implements IAuthorCard {
  @ApiProperty({ required: false, example: '🏫' })
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiProperty({ required: true, example: 'Boarding Schools' })
  @IsString()
  title: string;

  @ApiProperty({
    required: false,
    example: 'Dehradun, Shimla, Mussoorie — top residential schools assessed personally',
  })
  @IsOptional()
  @IsString()
  description?: string;
}

export class CreateAuthorDto implements IAuthor {
  @ApiProperty({ required: true, example: 'Gaurav Sharma' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    required: true,
    example: 'gaurav-sharma',
    description: 'Unique slug for the public author page (/author/[slug])',
  })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => slugify(value))
  slug: string;

  @ApiProperty({
    required: false,
    example: 'School Admission Expert · Education Advisor at EdHippo',
  })
  @IsOptional()
  @IsString()
  designation: string;

  @ApiProperty({ required: false, description: 'Profile photo URL' })
  @IsOptional()
  @IsString()
  photo?: string;

  @ApiProperty({
    required: false,
    description: 'Short plain-text bio for the inline author box (2–4 sentences)',
  })
  @IsOptional()
  @IsString()
  shortBio: string;

  @ApiProperty({
    required: false,
    description: 'Rich HTML about-me content for the dedicated author page',
  })
  @IsOptional()
  @IsString()
  fullBioHtml?: string;

  @ApiProperty({ required: false, description: 'Pull-quote shown on the author page' })
  @IsOptional()
  @IsString()
  quote?: string;

  @ApiProperty({ required: false, example: 'https://www.linkedin.com/in/gaurav-sharma' })
  @IsOptional()
  @IsString()
  linkedinUrl?: string;

  @ApiProperty({
    required: false,
    example: '919876543210',
    description: 'WhatsApp number in international format (digits only)',
  })
  @IsOptional()
  @IsString()
  whatsappNumber?: string;

  @ApiProperty({ required: false, type: [AuthorStatDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AuthorStatDto)
  stats?: AuthorStatDto[];

  @ApiProperty({ required: false, type: [AuthorCardDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AuthorCardDto)
  specialisations?: AuthorCardDto[];

  @ApiProperty({ required: false, type: [AuthorCardDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AuthorCardDto)
  credentials?: AuthorCardDto[];

  @ApiProperty({ required: false, type: Boolean, default: true })
  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
