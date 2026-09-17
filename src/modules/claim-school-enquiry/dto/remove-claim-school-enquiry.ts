import { Transform } from "class-transformer";
import { ArrayMinSize, ArrayUnique, IsMongoId } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class BulkRemoveClaimSchoolEnquiry {
    @ApiProperty({ required: true, isArray: true, minimum: 1, description: 'id\'s of enquiries to be removed' })
    @ArrayUnique()
    @IsMongoId({ each: true })
    @ArrayMinSize(1)
    @Transform(({ value }) => {
        if (!Array.isArray(value)) return [value];
        return value;
    })
    ids: string[];
}