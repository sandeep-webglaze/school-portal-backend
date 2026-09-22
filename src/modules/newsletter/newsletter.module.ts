import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { NewsletterService } from './newsletter.service';
import { NewsletterController } from './newsletter.controller';
import { NewsletterModel } from './entities/newsletter.entity';
import { NewsletterRepository } from './newsletter.repository';

@Module({
  imports: [MongooseModule.forFeature([NewsletterModel])],
  controllers: [NewsletterController],
  providers: [NewsletterRepository, NewsletterService],
})
export class NewsletterModule {}
