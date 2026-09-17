import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LeadsService } from './leads.service';
import { LeadsController } from './leads.controller';
import { LeadRepository } from './leads.repository';
import { LeadModel } from './entities/lead.entity';

@Module({
  imports: [MongooseModule.forFeature([LeadModel])],
  controllers: [LeadsController],
  providers: [LeadRepository, LeadsService],
  exports: [LeadsService]
})
export class LeadsModule { }
