import { Model } from 'mongoose';
import { MongoRepository } from '@/src/lib/repository';
import { ISchoolBoardDocument } from '../interface';
export declare class SchoolBoardRepository extends MongoRepository<ISchoolBoardDocument> {
    private entity;
    constructor(entity: Model<ISchoolBoardDocument>);
}
