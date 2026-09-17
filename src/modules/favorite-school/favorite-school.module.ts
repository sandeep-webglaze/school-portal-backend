import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SchoolModule } from '../school/school.module';
import { FavoriteSchoolService } from './favorite-school.service';
import { FavoriteSchoolController } from './favorite-school.controller';
import { FavoriteSchoolRepository } from './favorite-school.repository';
import { FavoriteSchoolModel } from './entities/favorite-school.entity';

@Module({
  imports: [MongooseModule.forFeature([FavoriteSchoolModel]), SchoolModule],
  controllers: [FavoriteSchoolController],
  providers: [FavoriteSchoolRepository, FavoriteSchoolService],
})
export class FavoriteSchoolModule { }
