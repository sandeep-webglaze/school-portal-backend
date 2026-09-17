import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { MongoRepository } from '@/src/lib/repository';
import { ISchoolBoardDocument } from '../interface';
import { SchoolBoardModel } from '../entities/school-board.entity';

@Injectable()
export class SchoolBoardRepository extends MongoRepository<ISchoolBoardDocument> {
    constructor(@InjectModel(SchoolBoardModel.name) private entity: Model<ISchoolBoardDocument>) {
        super(entity);
    }
}
