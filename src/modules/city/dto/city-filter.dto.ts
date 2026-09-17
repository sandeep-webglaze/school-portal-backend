import { ApiProperty } from "@nestjs/swagger";
import { ICity } from "../interface";
import { IsBoolean, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";

import { PaginateParamDto } from "@/src/lib/shared/paginated_param.dto";

export class CityFilterDto extends PaginateParamDto implements Partial<ICity> {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    country: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    state: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    city: string;

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
    isPopularCity: boolean;
}
