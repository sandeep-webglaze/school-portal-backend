import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CachingModule } from '@/src/config/caching.config';
import { SlugModule } from '../slug/slug.module';
import { UploadModule } from '../upload/upload.module';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { CityModel } from './entities/city.entity';
import { CityRepository } from './city.repository';

@Module({
  imports: [MongooseModule.forFeature([CityModel]), CachingModule, SlugModule, UploadModule],
  controllers: [CityController],
  providers: [CityRepository, CityService],
  exports: [CityService]
})
export class CityModule { }
