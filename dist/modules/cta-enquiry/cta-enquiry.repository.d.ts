import { Model } from 'mongoose';
import { MongoRepository } from '@/src/lib/repository/mongoDb.repository';
import { ICTAEnquiryDocument } from './interface';
export declare class CtaEnquiryRepository extends MongoRepository<ICTAEnquiryDocument> {
    private entity;
    constructor(entity: Model<ICTAEnquiryDocument>);
}
