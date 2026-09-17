import { Model } from 'mongoose';
import { MongoRepository } from '@/src/lib/repository';
import { IWalletDocument } from './interface';
export declare class WalletRepository extends MongoRepository<IWalletDocument> {
    private entity;
    constructor(entity: Model<IWalletDocument>);
}
