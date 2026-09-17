import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { MongoRepository } from '@/src/lib/repository';
import { IWalletDocument } from './interface';
import { WalletModel } from './entities/wallet.entity';

@Injectable()
export class WalletRepository extends MongoRepository<IWalletDocument> {
    constructor(@InjectModel(WalletModel.name) private entity: Model<IWalletDocument>) {
        super(entity);
    }
}
