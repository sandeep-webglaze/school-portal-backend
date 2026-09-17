import { Types } from 'mongoose';
import { IsMongoId, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { PaginateParamDto } from '@/src/lib/shared';
import { IFavoriteSchool } from '../interface';

export class FilterFavoriteSchoolDto extends PaginateParamDto implements Pick<IFavoriteSchool, 'user'> {
    @ApiProperty({ required: true, example: new Types.ObjectId(), description: "id of user" })
    @IsOptional()
    @IsMongoId()
    user: string;
}
