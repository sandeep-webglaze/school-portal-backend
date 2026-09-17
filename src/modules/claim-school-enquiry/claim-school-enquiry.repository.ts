import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { MongoRepository } from '@/src/lib/repository';
import { IClaimSchoolEnquiryDocument } from './interface';
import { ClaimSchoolEnquiryModel } from './entities/claim-school-enquiry.entity';

@Injectable()
export class ClaimSchoolEnquiryRepository extends MongoRepository<IClaimSchoolEnquiryDocument> {
    constructor(@InjectModel(ClaimSchoolEnquiryModel.name) private entity: Model<IClaimSchoolEnquiryDocument>) {
        super(entity);
    }
}
