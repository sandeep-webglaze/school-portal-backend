import { Model } from 'mongoose';
import { MongoRepository } from '@/src/lib/repository';
import { ISchoolClassificationDocument } from './interface';
export declare class SchoolClassificationRepository extends MongoRepository<ISchoolClassificationDocument> {
    private entity;
    constructor(entity: Model<ISchoolClassificationDocument>);
}
