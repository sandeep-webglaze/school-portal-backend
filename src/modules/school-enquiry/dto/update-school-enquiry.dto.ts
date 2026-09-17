import { Types } from "mongoose";
import { ArrayMinSize, ArrayUnique, IsArray, IsMongoId } from "class-validator";
import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";

import { CreateSchoolEnquiryDto } from "./create-school-enquiry.dto";

export class UpdateEnquiriesDto extends PartialType(OmitType(CreateSchoolEnquiryDto, ['submittedAt'])) {
    @ApiProperty({ required: true, isArray: true, example: [new Types.ObjectId()], description: "Unique list of id's of school enquiries" })
    @IsArray()
    @ArrayUnique()
    @ArrayMinSize(1)
    @IsMongoId({ each: true })
    enquiriesIds: string[]
}
