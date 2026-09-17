import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LeadsModule } from '../leads/leads.module';
import { SchoolEnquiryService } from './school-enquiry.service';
import { SchoolEnquiryController } from './school-enquiry.controller';
import { SchoolEnquiryRepository } from './school-enquiry.repository';
import { SchoolEnquiryModel } from './entities/school-enquiry.entity';
import { MailsHandlerModule } from '../mails-handler/mails-handler.module';

@Module({
  imports: [MongooseModule.forFeature([SchoolEnquiryModel]), LeadsModule, MailsHandlerModule],
  controllers: [SchoolEnquiryController],
  providers: [SchoolEnquiryRepository, SchoolEnquiryService],
})
export class SchoolEnquiryModule { }
