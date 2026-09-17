import { Model } from 'mongoose';
import { MongoRepository } from '@/src/lib/repository/mongoDb.repository';
import { ICityDocument } from './interface';
export declare class CityRepository extends MongoRepository<ICityDocument> {
    private entity;
    constructor(entity: Model<ICityDocument>);
}
