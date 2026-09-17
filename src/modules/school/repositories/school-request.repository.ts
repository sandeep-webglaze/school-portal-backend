import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { MongoRepository } from '@/src/lib/repository';
import { ISchoolRequestDocument } from '../interface';
import { SchoolRequestModel } from '../entities/school-request.entity';

@Injectable()
export class SchoolRequestRepository extends MongoRepository<ISchoolRequestDocument> {
    constructor(@InjectModel(SchoolRequestModel.name) private entity: Model<ISchoolRequestDocument>) {
        super(entity);
    }
}
