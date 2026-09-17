import { Model } from 'mongoose';
import { MongoRepository } from '@/src/lib/repository';
import { ISchoolEnquiryDocument } from './interface';
export declare class SchoolEnquiryRepository extends MongoRepository<ISchoolEnquiryDocument> {
    private entity;
    constructor(entity: Model<ISchoolEnquiryDocument>);
}
