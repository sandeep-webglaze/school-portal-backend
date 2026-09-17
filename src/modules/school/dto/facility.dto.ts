import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

import { PaginateParamDto } from '@/src/lib/shared';
import { IFacility } from '../interface';

export class CreateFacilityDto implements IFacility {
  @ApiProperty({ required: true, description: "Facility name" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true, description: "Url of facility icon" })
  @IsNotEmpty()
  @IsString()
  icon: string;
}

export class UpdateFacilityDto extends PartialType(CreateFacilityDto) { }

export class FacilityFilterDto extends PaginateParamDto implements Partial<IFacility> {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;
}