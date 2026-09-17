import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { MongoRepository } from '@/src/lib/repository';
import { IUserDocument } from './interface';
import { UserModel } from './entities/user.entity';

@Injectable()
export class UserRepository extends MongoRepository<IUserDocument> {
    constructor(@InjectModel(UserModel.name) readonly entity: Model<IUserDocument>) {
        super(entity);
    }
}
