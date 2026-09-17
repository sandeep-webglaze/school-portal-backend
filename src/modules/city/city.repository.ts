import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { MongoRepository } from '@/src/lib/repository/mongoDb.repository';
import { ICityDocument } from './interface';
import { CityModel } from './entities/city.entity';

@Injectable()
export class CityRepository extends MongoRepository<ICityDocument> {
    constructor(@InjectModel(CityModel.name) private entity: Model<ICityDocument>) {
        super(entity);
    }
}
