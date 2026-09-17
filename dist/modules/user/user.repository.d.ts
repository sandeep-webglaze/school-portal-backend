import { Model } from 'mongoose';
import { MongoRepository } from '@/src/lib/repository';
import { IUserDocument } from './interface';
export declare class UserRepository extends MongoRepository<IUserDocument> {
    readonly entity: Model<IUserDocument>;
    constructor(entity: Model<IUserDocument>);
}
