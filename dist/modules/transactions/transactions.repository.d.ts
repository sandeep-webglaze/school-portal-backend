import { Model } from 'mongoose';
import { MongoRepository } from '@/src/lib/repository';
import { ITransactionDocument } from './interface';
export declare class TransactionRepository extends MongoRepository<ITransactionDocument> {
    private entity;
    constructor(entity: Model<ITransactionDocument>);
}
