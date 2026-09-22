import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { MongoRepository } from '@/src/lib/repository/mongoDb.repository';
import { INewsletterDocument } from './interface';
import { NewsletterModel } from './entities/newsletter.entity';

@Injectable()
export class NewsletterRepository extends MongoRepository<INewsletterDocument> {
  constructor(@InjectModel(NewsletterModel.name) private entity: Model<INewsletterDocument>) {
    super(entity);
  }
}
