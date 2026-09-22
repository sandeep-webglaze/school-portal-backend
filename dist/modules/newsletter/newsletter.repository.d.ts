import { Model } from 'mongoose';
import { MongoRepository } from '@/src/lib/repository/mongoDb.repository';
import { INewsletterDocument } from './interface';
export declare class NewsletterRepository extends MongoRepository<INewsletterDocument> {
    private entity;
    constructor(entity: Model<INewsletterDocument>);
}
