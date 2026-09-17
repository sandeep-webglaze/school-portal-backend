import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { OTP_STATUS } from '@/src/lib/constants';
import { MongoRepository } from '@/src/lib/repository';
import { IOTPDocument } from './interface';
import { OtpModel } from './entities/otp.entity';

@Injectable()
export class OtpRepository extends MongoRepository<IOTPDocument> {
  constructor(@InjectModel(OtpModel.name) private entity: Model<IOTPDocument>) {
    super(entity);
  }

  // Generic method to get OTPs after a certain time for either phoneNumber or email
  async getOtpListAfter(identifier: string, afterTime: Date) {
    const query = identifier.includes('@')
      ? { email: identifier, createdAt: { $gte: afterTime } }
      : { phoneNumber: identifier, createdAt: { $gte: afterTime } };

    return await this.entity.find(query);
  }

  // Generic method to get the latest OTP for either phoneNumber or email
  async getLatestOtp(identifier: string) {
    const query = identifier.includes('@')
      ? { email: identifier, status: OTP_STATUS.PENDING }
      : { phoneNumber: identifier, status: OTP_STATUS.PENDING };

    return await this.entity.findOne(query).sort({ createdAt: -1 }).exec();
  }
}

