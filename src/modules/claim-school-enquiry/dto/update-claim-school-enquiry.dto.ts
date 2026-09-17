import { PartialType } from '@nestjs/swagger';

import { CreateClaimSchoolEnquiryDto } from './create-claim-school-enquiry.dto';

export class UpdateClaimSchoolEnquiryDto extends PartialType(CreateClaimSchoolEnquiryDto) { }
