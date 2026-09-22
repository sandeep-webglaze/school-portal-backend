import { Transform, Type } from 'class-transformer';
import { ArrayUnique, IsArray, IsBoolean, IsMongoId, IsNotEmpty, IsNumber, IsOptional, Matches, IsPositive, IsString, Max, Min, ValidateNested } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

import { slugify } from '@/src/lib/utils';
import { ISchool } from '../interface';
import { Types } from 'mongoose';

export class CreateSchoolDto implements ISchool {
  @ApiProperty({ required: true, example: "Apex school", description: "name of the school" })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ required: true, example: "dr. alex will" })
  @IsNotEmpty()
  @IsString()
  chairman: string;

  @ApiProperty({ required: true, type: Number, minimum: 1500, maximum: 3000, example: 1990, description: "year of establishment of school" })
  @IsPositive()
  @Min(1500)
  @Max(3000)
  establishmentYear: number;

  @ApiProperty({ required: true, example: "english", description: "Medium of the school" })
  @IsNotEmpty()
  @IsString()
  medium: string;

  @ApiProperty({ required: true, example: new Types.ObjectId(), description: "id of school classification" })
  @IsMongoId()
  classification: string;

  @ApiProperty({ required: true, example: new Types.ObjectId(), description: "id of city where school present" })
  @IsMongoId()
  city: string;

  @ApiProperty({ required: true, type: Number, minimum: 1, example: 5000, description: "Minimum fees of the school" })
  @IsPositive()
  minFees: number;

  @ApiProperty({ required: true, type: Number, minimum: 1, example: 10000, description: "Maximum fees of the school" })
  @IsPositive()
  maxFees: number;

  @ApiProperty({ required: true, example: "March", description: "formatted Date when admission starts at school" })
  @IsNotEmpty()
  @IsString()
  admissionStart: string;

  @ApiProperty({ required: true, example: "April", description: "formatted Date when admission starts at school" })
  @IsNotEmpty()
  @IsString()
  admissionEnd: string;

  @ApiProperty({ required: true, example: "1", description: "starting class which school provide" })
  @IsNotEmpty()
  @IsString()
  classFrom: string;

  @ApiProperty({ required: true, example: "12", description: "final class which school offers" })
  @IsNotEmpty()
  @IsString()
  classTo: string;

  @ApiProperty({ required: true, example: "1212343455", description: "Contact number of school" })
  @Matches(/^\+?[0-9\s()-]{6,20}$/, { message: 'Please enter a valid phone number' })
  contactNumber: string;

  @ApiProperty({ required: true, example: "school@mail.com", description: "Contact email of school" })
  @IsNotEmpty()
  @IsString()
  mail: string;

  @ApiProperty({ required: true, example: "http://some-school.com/home", description: "Website url of school" })
  @IsNotEmpty()
  @IsString()
  website: string;

  @ApiProperty({ required: true, example: "we the best school in new york", description: "About us text of school" })
  @IsNotEmpty()
  @IsString()
  about: string;

  avgRating: number = 0;
  avgAcademicsRating: number = 0;
  avgInfrastructureRating: number = 0;
  avgAddmissionRating: number = 0;
  avgExtracurriclarRating: number = 0;

  @ApiProperty({ required: true, isArray: true, example: ["http://images.com/some-school-images"], description: "List of images of schools" })
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  images: string[];

  @ApiProperty({ required: true, isArray: true, example: [new Types.ObjectId()], description: "Unique list of school type" })
  @IsArray()
  @ArrayUnique()
  @IsMongoId({ each: true })
  type: string[];

  @ApiProperty({ required: true, isArray: true, example: [new Types.ObjectId()], description: "Unique list of boards which school provide" })
  @IsArray()
  @ArrayUnique()
  @IsMongoId({ each: true })
  schoolBoards: string[];

  @ApiProperty({ required: true, isArray: true, example: [new Types.ObjectId()], description: "Unique list of facilities which school provide" })
  @IsArray()
  @ArrayUnique()
  @IsMongoId({ each: true })
  facilities: string[];

  @ApiProperty({ required: false, type: Boolean, default: false, description: "Featured flag for school" })
  @IsOptional()
  @IsBoolean()
  isFeatured: boolean;

  @ApiProperty({ required: false, type: Boolean, default: false, description: "Featured priority of school" })
  @IsOptional()
  @IsPositive()
  featuredPriority: number;

  @ApiProperty({ required: false, type: Boolean, default: false, description: "Published flag for school" })
  @IsOptional()
  @IsBoolean()
  published: boolean;

  @ApiProperty({ required: true, example: "some unique school slug", description: "unique slug of school" })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => slugify(value))
  slug: string;
}

export class UpdateSchoolDto extends PartialType(CreateSchoolDto) {
  @ApiProperty({ required: false, isArray: true, description: "Urls of school images which are to be removed" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  removeImageUrls?: string[] = []
}


export class FeaturedSchoolPriorityDto {
  @ApiProperty({ required: true, example: new Types.ObjectId(), description: "id of school" })
  @IsOptional()
  @IsMongoId()
  schoolId: string;

  @ApiProperty({ required: true, example: 0, description: "Priority of school" })
  @IsNumber()
  @Min(0)
  priority: number
}

export class UpdateFeaturedSchoolsPriorityDto {
  @ApiProperty({ required: false, isArray: true, description: "Map of school id with their priorities" })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FeaturedSchoolPriorityDto)
  priorities: FeaturedSchoolPriorityDto[]
}
