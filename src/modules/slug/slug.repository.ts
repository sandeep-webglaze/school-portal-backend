import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { MongoRepository } from '@/src/lib/repository';
import { SlugModel } from './entities/slug.entity';
import { ISlugDocument } from './interface';

@Injectable()
export class SlugRepository extends MongoRepository<ISlugDocument> {
    constructor(@InjectModel(SlugModel.name) private entity: Model<ISlugDocument>) {
        super(entity);
    }
}
