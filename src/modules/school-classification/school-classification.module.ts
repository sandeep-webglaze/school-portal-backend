import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CachingModule } from '@/src/config/caching.config';
import { SchoolClassificationService } from './school-classification.service';
import { SchoolClassificationController } from './school-classification.controller';
import { SchoolClassificationModel } from './entities/school-classification.entity';
import { SchoolClassificationRepository } from './school-classification.repository';

@Module({
  controllers: [SchoolClassificationController],
  providers: [SchoolClassificationRepository, SchoolClassificationService],
  imports: [MongooseModule.forFeature([SchoolClassificationModel]), CachingModule],
  exports: [SchoolClassificationService]
})
export class SchoolClassificationModule { }
