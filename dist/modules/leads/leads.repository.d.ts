import { Model } from 'mongoose';
import { MongoRepository } from '@/src/lib/repository';
import { ILeadDocument } from './interface';
export declare class LeadRepository extends MongoRepository<ILeadDocument> {
    private entity;
    constructor(entity: Model<ILeadDocument>);
}
