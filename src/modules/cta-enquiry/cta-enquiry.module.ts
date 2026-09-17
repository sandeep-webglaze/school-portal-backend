import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CtaEnquiryService } from './cta-enquiry.service';
import { CtaEnquiryController } from './cta-enquiry.controller';
import { CTAEnquiryModel } from './entities/cta-enquiry.entity';
import { CtaEnquiryRepository } from './cta-enquiry.repository';

@Module({
  imports: [MongooseModule.forFeature([CTAEnquiryModel])],
  controllers: [CtaEnquiryController],
  providers: [CtaEnquiryRepository, CtaEnquiryService],
})
export class CtaEnquiryModule { }
