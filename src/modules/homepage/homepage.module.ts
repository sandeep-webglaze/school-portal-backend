import { Module } from '@nestjs/common';

import { CachingModule } from '@/src/config/caching.config';
import { CityModule } from '../city/city.module';
import { SlugModule } from '../slug/slug.module';
import { SchoolModule } from '../school/school.module';
import { SchoolTypesModule } from '../school-types/school-types.module';
import { SchoolClassificationModule } from '../school-classification/school-classification.module';
import { HomepageService } from './homepage.service';
import { HomepageController } from './homepage.controller';
import { WalletsModule } from '../wallets/wallets.module';
import { TransactionsModule } from '../transactions/transactions.module';
import { LeadsModule } from '../leads/leads.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [HomepageController],
  providers: [HomepageService],
  imports: [CachingModule, CityModule, SchoolModule, SlugModule, SchoolTypesModule, SchoolClassificationModule, WalletsModule, TransactionsModule, LeadsModule, AuthModule]
})
export class HomepageModule { }
