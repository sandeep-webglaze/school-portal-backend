import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { MongoRepository } from '@/src/lib/repository';
import { ISchoolEnquiryDocument } from './interface';
import { SchoolEnquiryModel } from './entities/school-enquiry.entity';

@Injectable()
export class SchoolEnquiryRepository extends MongoRepository<ISchoolEnquiryDocument> {
    constructor(@InjectModel(SchoolEnquiryModel.name) private entity: Model<ISchoolEnquiryDocument>) {
        super(entity);
    }
}
