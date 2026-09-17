import { jwtConfig } from '@/src/config/jwt.config';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { Module, forwardRef } from '@nestjs/common';

import { CachingModule } from '@/src/config/caching.config';
import { OtpModule } from '../otp/otp.module';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RolesGuard } from './guards/roles.guard';
import { JWTAuthGuard } from './guards/jwt.guard';
import { FacebookStrategy } from './strategies/facebook.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { MailsHandlerModule } from '../mails-handler/mails-handler.module';
import { DeleteAccountRequestsModule } from '../delete-account-requests/delete-account-requests.module';
import { SMSService } from '@/src/lib/shared';

@Module({
  controllers: [AuthController],
  exports: [AuthService],
  providers: [
    AuthService,
    JwtStrategy,
    GoogleStrategy,
    FacebookStrategy,
    {
      provide: APP_GUARD,
      useClass: JWTAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: SMSService,
      useClass: SMSService,
    },
  ],
  imports: [
    CachingModule,
    PassportModule,
    JwtModule.registerAsync(jwtConfig),
    forwardRef(() => UserModule),
    OtpModule,
    MailsHandlerModule,
  ],
})
export class AuthModule { }
