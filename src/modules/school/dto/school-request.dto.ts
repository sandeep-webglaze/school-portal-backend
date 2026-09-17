import { Types } from "mongoose";
import { Type } from "class-transformer";
import { Equals, IsEnum, IsMongoId, IsNotEmpty, IsObject, IsOptional, ValidateNested } from "class-validator";
import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";

import { PaginateParamDto } from "@/src/lib/shared";
import { SCHOOL_REQUEST_STATUS } from "@/src/lib/constants";
import { ISchoolRequest } from "../interface";
import { UpdateSchoolDto } from "./school.dto";

export class SchoolChangesDto extends OmitType(UpdateSchoolDto, [
    'avgAcademicsRating',
    'avgAddmissionRating',
    'avgExtracurriclarRating',
    'avgInfrastructureRating',
    'avgRating',
    'city',
    'slug',
    'isFeatured',
    'published',
]) { }

export class CreateSchoolRequestDto implements Omit<ISchoolRequest, 'school'> {
    @ApiProperty({ required: false, enum: SCHOOL_REQUEST_STATUS, example: SCHOOL_REQUEST_STATUS.PENDING, default: SCHOOL_REQUEST_STATUS.PENDING, description: "status of school request" })
    @IsOptional()
    @IsEnum(SCHOOL_REQUEST_STATUS)
    @Equals(SCHOOL_REQUEST_STATUS.PENDING)
    status: SCHOOL_REQUEST_STATUS;

    @ApiProperty({ required: true, type: SchoolChangesDto })
    @IsNotEmpty()
    @IsObject()
    @ValidateNested()
    @Type(() => SchoolChangesDto)
    requestedChanges: SchoolChangesDto;
}

export class UpdateSchoolRequestDto extends PartialType(CreateSchoolRequestDto) { }

export class SchoolRequestFilterDto extends PaginateParamDto implements Partial<ISchoolRequest> {
    @ApiProperty({ required: false, enum: SCHOOL_REQUEST_STATUS })
    @IsOptional()
    @IsEnum(SCHOOL_REQUEST_STATUS)
    status?: SCHOOL_REQUEST_STATUS;

    @ApiProperty({ required: true, example: new Types.ObjectId(), description: "id of school" })
    @IsOptional()
    @IsMongoId()
    school: string;
}
