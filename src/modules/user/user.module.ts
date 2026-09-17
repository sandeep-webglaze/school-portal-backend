import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OtpModule } from '../otp/otp.module';
import { AuthModule } from '../auth/auth.module';
import { UploadModule } from '../upload/upload.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserModel } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { WalletsModule } from '../wallets/wallets.module';
import { FirebaseAdmin, SMSService } from '@/src/lib/shared';
import { MailsHandlerModule } from '../mails-handler/mails-handler.module';

@Module({
  imports: [
    MongooseModule.forFeature([UserModel]),
    UploadModule,
    OtpModule,
    forwardRef(() => AuthModule),
    WalletsModule,
    MailsHandlerModule,
  ],
  controllers: [UserController],
  providers: [UserRepository, UserService, SMSService, FirebaseAdmin],
  exports: [UserService],
})
export class UserModule {}
