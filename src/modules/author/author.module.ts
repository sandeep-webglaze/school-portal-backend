import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CachingModule } from '@/src/config/caching.config';
import { SlugModule } from '../slug/slug.module';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { AuthorModel } from './entities/author.entity';
import { AuthorRepository } from './author.repository';

@Module({
  imports: [MongooseModule.forFeature([AuthorModel]), CachingModule, SlugModule],
  controllers: [AuthorController],
  providers: [AuthorRepository, AuthorService],
  exports: [AuthorService],
})
export class AuthorModule { }
