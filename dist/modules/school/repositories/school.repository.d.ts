import { Model } from 'mongoose';
import { MongoRepository } from '@/src/lib/repository';
import { ISchoolDocument } from '../interface';
export declare class SchoolRepository extends MongoRepository<ISchoolDocument> {
    private entity;
    constructor(entity: Model<ISchoolDocument>);
}
