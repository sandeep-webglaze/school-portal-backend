import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { MongoRepository } from '@/src/lib/repository';
import { ISchoolTypeDocument } from './interface';
import { SchoolTypeModel } from './entities/school-type.entity';

@Injectable()
export class SchoolTypeRepository extends MongoRepository<ISchoolTypeDocument> {
    constructor(@InjectModel(SchoolTypeModel.name) private entity: Model<ISchoolTypeDocument>) {
        super(entity);
    }
}
