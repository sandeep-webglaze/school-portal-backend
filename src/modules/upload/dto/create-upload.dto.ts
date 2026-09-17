import { IsEnum, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { FILE_TYPE } from "@/src/lib/constants";

export class UploadImageDto {
    @ApiProperty({ required: true, enum: FILE_TYPE, description: "Category of File" })
    @IsEnum(FILE_TYPE)
    type: FILE_TYPE
}

export class GetFilesListDto {
    @ApiProperty({ required: false, enum: FILE_TYPE })
    @IsOptional()
    @IsEnum(FILE_TYPE)
    prefix: FILE_TYPE
}
