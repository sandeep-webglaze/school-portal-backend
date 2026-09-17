import { MongooseModule } from '@nestjs/mongoose';
import { Module, forwardRef } from '@nestjs/common';

import { CachingModule } from '@/src/config/caching.config';
import { CityModule } from '../city/city.module';
import { SchoolModule } from '../school/school.module';
import { AppConfigurationModule } from '../app-configuration/app-configuration.module';
import { SlugService } from './slug.service';
import { SlugController } from './slug.controller';
import { SlugRepository } from './slug.repository';
import { SlugModel } from './entities/slug.entity';
import { AuthorModel } from '../author/entities/author.entity';

@Module({
  // AuthorModel is registered here so SlugService can resolve authors from
  // content links without importing AuthorModule (which imports SlugModule).
  imports: [MongooseModule.forFeature([SlugModel, AuthorModel]), CachingModule, AppConfigurationModule, forwardRef(() => SchoolModule), forwardRef(() => CityModule)],
  controllers: [SlugController],
  providers: [SlugRepository, SlugService],
  exports: [SlugService]
})
export class SlugModule { }
