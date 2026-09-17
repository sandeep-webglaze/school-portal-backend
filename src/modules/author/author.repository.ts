import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { MongoRepository } from '@/src/lib/repository/mongoDb.repository';
import { IAuthorDocument } from './interface';
import { AuthorModel } from './entities/author.entity';

@Injectable()
export class AuthorRepository extends MongoRepository<IAuthorDocument> {
  constructor(@InjectModel(AuthorModel.name) private entity: Model<IAuthorDocument>) {
    super(entity);
  }
}
