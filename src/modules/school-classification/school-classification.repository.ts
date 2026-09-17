import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { MongoRepository } from '@/src/lib/repository';
import { ISchoolClassificationDocument } from './interface';
import { SchoolClassificationModel } from './entities/school-classification.entity';

@Injectable()
export class SchoolClassificationRepository extends MongoRepository<ISchoolClassificationDocument> {
    constructor(@InjectModel(SchoolClassificationModel.name) private entity: Model<ISchoolClassificationDocument>) {
        super(entity);
    }
}
