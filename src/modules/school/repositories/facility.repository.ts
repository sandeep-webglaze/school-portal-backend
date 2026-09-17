import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { MongoRepository } from '@/src/lib/repository';
import { IFacilityDocument } from '../interface';
import { FacilityModel } from '../entities/facility.entity';

@Injectable()
export class FacilityRepository extends MongoRepository<IFacilityDocument> {
    constructor(@InjectModel(FacilityModel.name) private entity: Model<IFacilityDocument>) {
        super(entity);
    }
}
