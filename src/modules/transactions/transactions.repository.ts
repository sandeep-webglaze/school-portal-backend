import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { MongoRepository } from '@/src/lib/repository';
import { ITransactionDocument } from './interface';
import { TransactionModel } from './entities/transaction.entity';

@Injectable()
export class TransactionRepository extends MongoRepository<ITransactionDocument> {
    constructor(@InjectModel(TransactionModel.name) private entity: Model<ITransactionDocument>) {
        super(entity);
    }
}
