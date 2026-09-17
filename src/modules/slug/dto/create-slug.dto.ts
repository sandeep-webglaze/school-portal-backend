import { Types } from 'mongoose';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { slugify } from '@/src/lib/utils';
import { SLUG_TYPE } from '@/src/lib/constants';
import {
  ISlugSchoolFilter,
  ISlug,
  ISlugMetaData,
  ISlugMetaRobots,
  ISlugMetaOpenGraph,
  ISlugMetaTweeter,
  ISlugFaq,
} from '../interface';

class SlugMetaRobotsDto implements ISlugMetaRobots {
  @ApiProperty({ required: false, type: Boolean })
  @IsOptional()
  @IsBoolean()
  index: boolean;

  @ApiProperty({ required: false, type: Boolean })
  @IsOptional()
  @IsBoolean()
  follow: boolean;

  @ApiProperty({ required: false, type: Boolean })
  @IsOptional()
  @IsBoolean()
  noarchive: boolean;

  @ApiProperty({ required: false, type: Boolean })
  @IsOptional()
  @IsBoolean()
  nosnippet: boolean;

  @ApiProperty({ required: false, type: Boolean })
  @IsOptional()
  @IsBoolean()
  noimageindex: boolean;

  @ApiProperty({ required: false, type: Boolean })
  @IsOptional()
  @IsBoolean()
  nocache: boolean;

  @ApiProperty({ required: false, type: Boolean })
  @IsOptional()
  @IsBoolean()
  notranslate: boolean;

  @ApiProperty({ required: false, type: Boolean })
  @IsOptional()
  @IsBoolean()
  indexifembedded: boolean;

  @ApiProperty({ required: false, type: Boolean })
  @IsOptional()
  @IsBoolean()
  nositelinkssearchbox: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  unavailable_after: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  'max-video-preview': string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  'max-image-preview': string;

  @ApiProperty({ required: false, type: Number })
  @IsOptional()
  @IsNumber()
  'max-snippet': number;
}

class SlugMetaOpenGraphDto implements ISlugMetaOpenGraph {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  locale: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  type: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  url: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  images: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  siteName: string;
}

class SlugMetaTweeterDto implements ISlugMetaTweeter {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  card: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  site: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  images: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  creator: string;
}

export class SlugMetaDataDto implements ISlugMetaData {
  @ApiProperty({ required: true })
  @IsString()
  title: string;

  @ApiProperty({ required: true })
  @IsString()
  description: string;

  @ApiProperty({
    required: false,
    description: 'Comma-separated SEO keywords for this slug page',
  })
  @IsOptional()
  @IsString()
  keywords?: string;

  @ApiProperty({ required: false, type: SlugMetaRobotsDto })
  @IsOptional()
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => SlugMetaRobotsDto)
  robots: SlugMetaRobotsDto;

  @ApiProperty({ required: false, type: SlugMetaOpenGraphDto })
  @IsOptional()
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => SlugMetaOpenGraphDto)
  openGraph: SlugMetaOpenGraphDto;

  @ApiProperty({ required: false, type: SlugMetaTweeterDto })
  @IsOptional()
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => SlugMetaTweeterDto)
  twitter: SlugMetaTweeterDto;
}

export class SlugSchoolFilterDto implements ISlugSchoolFilter {
  @ApiProperty({
    required: false,
    example: new Types.ObjectId(),
    description: 'id of classification',
  })
  @IsOptional()
  @IsMongoId()
  classification?: string;

  @ApiProperty({
    required: false,
    example: new Types.ObjectId(),
    description: 'id of school board',
  })
  @IsOptional()
  @IsMongoId()
  schoolBoard?: string;

  @ApiProperty({
    required: false,
    example: new Types.ObjectId(),
    description: 'id of school type',
  })
  @IsOptional()
  @IsMongoId()
  type?: string;

  @ApiProperty({
    required: false,
    example: new Types.ObjectId(),
    description: 'id of city',
  })
  @IsOptional()
  @IsMongoId()
  city?: string;

  @ApiProperty({
    required: false,
    example: new Types.ObjectId(),
    description: 'id of school',
  })
  @IsOptional()
  @IsMongoId()
  school?: string;
}

export class SlugFaqDto implements ISlugFaq {
  @ApiProperty({ required: true, description: 'FAQ question' })
  @IsString()
  question: string;

  @ApiProperty({ required: true, description: 'FAQ answer' })
  @IsString()
  answer: string;
}

export class CreateSlugDto implements ISlug {
  @ApiProperty({ required: false, type: SlugMetaDataDto })
  @IsOptional()
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => SlugMetaDataDto)
  slugMetaData: SlugMetaDataDto;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  slugJsonSchema: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  slugContent: string;

  @ApiProperty({ required: true, example: 'some unique slug text' })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => slugify(value))
  slug: string;

  @ApiProperty({
    required: true,
    description: 'text which is short description of slug',
  })
  @IsNotEmpty()
  @IsString()
  formattedText: string;

  @ApiProperty({
    required: false,
    type: Boolean,
    default: false,
    description: 'homepage flag for slug',
  })
  @IsOptional()
  @IsBoolean()
  isHomepageSlug: boolean;

  @ApiProperty({
    required: false,
    type: SlugSchoolFilterDto,
    description: 'filter for which slug is created',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsObject()
  @Type(() => SlugSchoolFilterDto)
  @ValidateNested()
  filters?: SlugSchoolFilterDto;

  @ApiProperty({
    required: false,
    default: SLUG_TYPE.COMBINATION,
    enum: SLUG_TYPE,
  })
  @IsOptional()
  @IsEnum(SLUG_TYPE)
  slugType: SLUG_TYPE;

  @ApiProperty({
    required: false,
    description: 'On-page H1 heading for the search landing page',
  })
  @IsOptional()
  @IsString()
  heroTitle?: string;

  @ApiProperty({
    required: false,
    description: 'Sub-heading shown beneath the hero H1',
  })
  @IsOptional()
  @IsString()
  heroSubtitle?: string;

  @ApiProperty({
    required: false,
    description: 'Banner image URL used as the search page hero background',
  })
  @IsOptional()
  @IsString()
  heroImage?: string;

  @ApiProperty({
    required: false,
    type: [SlugFaqDto],
    description: 'Admin-managed FAQ list for the search landing page',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SlugFaqDto)
  faqs?: SlugFaqDto[];

  @ApiProperty({
    required: false,
    example: new Types.ObjectId(),
    nullable: true,
    description: 'id of the assigned author — send null to un-assign',
  })
  @IsOptional()
  @ValidateIf((o) => o.author !== null && o.author !== '')
  @IsMongoId()
  author?: string | null;
}
