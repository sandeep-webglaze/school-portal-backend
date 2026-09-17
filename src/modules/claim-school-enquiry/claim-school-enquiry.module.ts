import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ClaimSchoolEnquiryService } from './claim-school-enquiry.service';
import { ClaimSchoolEnquiryController } from './claim-school-enquiry.controller';
import { ClaimSchoolEnquiryRepository } from './claim-school-enquiry.repository';
import { ClaimSchoolEnquiryModel } from './entities/claim-school-enquiry.entity';

@Module({
  imports: [MongooseModule.forFeature([ClaimSchoolEnquiryModel])],
  controllers: [ClaimSchoolEnquiryController],
  providers: [ClaimSchoolEnquiryRepository, ClaimSchoolEnquiryService],
})
export class ClaimSchoolEnquiryModule { }
