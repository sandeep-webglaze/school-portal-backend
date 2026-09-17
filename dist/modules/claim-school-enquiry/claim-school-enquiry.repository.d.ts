import { Model } from 'mongoose';
import { MongoRepository } from '@/src/lib/repository';
import { IClaimSchoolEnquiryDocument } from './interface';
export declare class ClaimSchoolEnquiryRepository extends MongoRepository<IClaimSchoolEnquiryDocument> {
    private entity;
    constructor(entity: Model<IClaimSchoolEnquiryDocument>);
}
