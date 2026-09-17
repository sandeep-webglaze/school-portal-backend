import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { MongoRepository } from '@/src/lib/repository';
import { ISchoolDocument } from '../interface';
import { SchoolModel } from '../entities/school.entity';

@Injectable()
export class SchoolRepository extends MongoRepository<ISchoolDocument> {
    constructor(@InjectModel(SchoolModel.name) private entity: Model<ISchoolDocument>) {
        super(entity);
    }
}
