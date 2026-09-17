import { Model } from 'mongoose';
import { MongoRepository } from '@/src/lib/repository';
import { ISlugDocument } from './interface';
export declare class SlugRepository extends MongoRepository<ISlugDocument> {
    private entity;
    constructor(entity: Model<ISlugDocument>);
}
