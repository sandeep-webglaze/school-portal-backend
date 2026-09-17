import { Model } from 'mongoose';
import { MongoRepository } from '@/src/lib/repository/mongoDb.repository';
import { IAuthorDocument } from './interface';
export declare class AuthorRepository extends MongoRepository<IAuthorDocument> {
    private entity;
    constructor(entity: Model<IAuthorDocument>);
}
