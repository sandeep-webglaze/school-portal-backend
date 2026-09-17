import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { MongoRepository } from '@/src/lib/repository';
import { ILeadDocument } from './interface';
import { LeadModel } from './entities/lead.entity';

@Injectable()
export class LeadRepository extends MongoRepository<ILeadDocument> {
    constructor(@InjectModel(LeadModel.name) private entity: Model<ILeadDocument>) {
        super(entity);
    }
}
