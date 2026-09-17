import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SMSService } from '@/src/lib/shared/services';

import { OtpRepository } from './otp.repository';
import { OtpService } from './otp.service';
import { OtpModel } from './entities/otp.entity';

@Module({
  providers: [SMSService, OtpRepository, OtpService],
  exports: [OtpService],
  imports: [MongooseModule.forFeature([OtpModel])]
})
export class OtpModule { }
