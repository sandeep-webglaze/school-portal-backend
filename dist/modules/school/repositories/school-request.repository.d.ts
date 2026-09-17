import { Model } from 'mongoose';
import { MongoRepository } from '@/src/lib/repository';
import { ISchoolRequestDocument } from '../interface';
export declare class SchoolRequestRepository extends MongoRepository<ISchoolRequestDocument> {
    private entity;
    constructor(entity: Model<ISchoolRequestDocument>);
}
