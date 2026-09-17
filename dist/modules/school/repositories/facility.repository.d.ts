import { Model } from 'mongoose';
import { MongoRepository } from '@/src/lib/repository';
import { IFacilityDocument } from '../interface';
export declare class FacilityRepository extends MongoRepository<IFacilityDocument> {
    private entity;
    constructor(entity: Model<IFacilityDocument>);
}
