import { Model } from 'mongoose';
import { MongoRepository } from '@/src/lib/repository';
import { ISchoolTypeDocument } from './interface';
export declare class SchoolTypeRepository extends MongoRepository<ISchoolTypeDocument> {
    private entity;
    constructor(entity: Model<ISchoolTypeDocument>);
}
