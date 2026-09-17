import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CachingModule } from '@/src/config/caching.config';
import { AppConfigurationService } from './app-configuration.service';
import { AppConfigurationController } from './app-configuration.controller';
import { AppConfigurationModel } from './entities/app-configuration.entity';
import { AppConfigurationRepository } from './app-configuration.repository';

@Module({
  imports: [MongooseModule.forFeature([AppConfigurationModel]), CachingModule],
  controllers: [AppConfigurationController],
  providers: [AppConfigurationRepository, AppConfigurationService],
  exports: [AppConfigurationService]
})
export class AppConfigurationModule { }
