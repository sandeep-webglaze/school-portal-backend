import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

import { slugify } from "@/src/lib/utils";
import { ICity } from "../interface";

export class CreateCityDto implements ICity {
    @ApiProperty({ required: true, example: "india" })
    @IsNotEmpty()
    @IsString()
    country: string;

    @ApiProperty({ required: true, example: "Himachal Pradesh" })
    @IsNotEmpty()
    @IsString()
    state: string;

    @ApiProperty({ required: true, example: "Dehradun", description: "name of the city" })
    @IsNotEmpty()
    @IsString()
    city: string;

    @ApiProperty({ required: true, example: "http://icons.com/city-icon", description: "icon of the city" })
    @IsNotEmpty()
    @IsString()
    icon: string;

    @ApiProperty({ required: false, type: Boolean, default: false, description: "popularity flag for city" })
    @IsOptional()
    @IsBoolean()
    isPopularCity: boolean;

    @ApiProperty({ required: true, example: "demo slug", description: "a unique text for slug" })
    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => slugify(value))
    slug: string;
}
