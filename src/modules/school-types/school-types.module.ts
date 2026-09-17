import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CachingModule } from '@/src/config/caching.config';
import { SchoolTypeController } from './school-types.controller';
import { SchoolTypeService } from './school-types.service';
import { SchoolTypeRepository } from './school-type.repository';
import { SchoolTypeModel } from './entities/school-type.entity';

@Module({
  controllers: [SchoolTypeController],
  providers: [SchoolTypeRepository, SchoolTypeService],
  imports: [MongooseModule.forFeature([SchoolTypeModel]), CachingModule],
  exports: [SchoolTypeService]
})
export class SchoolTypesModule { }
