import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { MongoRepository } from '@/src/lib/repository/mongoDb.repository';
import { ICTAEnquiryDocument } from './interface';
import { CTAEnquiryModel } from './entities/cta-enquiry.entity';

@Injectable()
export class CtaEnquiryRepository extends MongoRepository<ICTAEnquiryDocument> {
    constructor(@InjectModel(CTAEnquiryModel.name) private entity: Model<ICTAEnquiryDocument>) {
        super(entity);
    }
}
