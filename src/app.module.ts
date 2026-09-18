import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { PrometheusModule } from "@willsoto/nestjs-prometheus";

import MongooseConfig from './config/mongoose.config';
import ThrottlerConfig from './config/rate-limit.config';
import { CachingModule } from './config/caching.config';
import { AppController } from './app.controller';
import { ConfigModule } from './config/config.module';
import { SchoolModule } from './modules/school/school.module';
import { CityModule } from './modules/city/city.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TransformInterceptor } from './lib/interceptors/Response.interceptor';
import { SchoolReviewModule } from './modules/school-review/school-review.module';
import { HomepageModule } from './modules/homepage/homepage.module';
import { OtpModule } from './modules/otp/otp.module';
import { SchoolEnquiryModule } from './modules/school-enquiry/school-enquiry.module';
import { UploadModule } from './modules/upload/upload.module';
import { SchoolTypesModule } from './modules/school-types/school-types.module';
import { SchoolClassificationModule } from './modules/school-classification/school-classification.module';
import { SlugModule } from './modules/slug/slug.module';
import { AppConfigurationModule } from './modules/app-configuration/app-configuration.module';
import { LoggingInterceptor } from './lib/interceptors/ReqResLogger.interceptor';
import { CtaEnquiryModule } from './modules/cta-enquiry/cta-enquiry.module';
import { AppMetricInterceptor } from './lib/interceptors/AppMetric.interceptor';
import { AppMetricsModule } from './modules/app-metrics/app-metrics.module';
import { FavoriteSchoolModule } from './modules/favorite-school/favorite-school.module';
import { LeadsModule } from './modules/leads/leads.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { WalletsModule } from './modules/wallets/wallets.module';
import { MailsHandlerModule } from './modules/mails-handler/mails-handler.module';
import { ClaimSchoolEnquiryModule } from './modules/claim-school-enquiry/claim-school-enquiry.module';
import { DeleteAccountRequestsModule } from './modules/delete-account-requests/delete-account-requests.module';
import { AuthorModule } from './modules/author/author.module';

@Module({
  imports: [
    ConfigModule,
    MongooseConfig,
    CachingModule,
    ThrottlerConfig,
    SchoolModule,
    CityModule,
    UserModule,
    AuthModule,
    SchoolReviewModule,
    HomepageModule,
    OtpModule,
    SchoolEnquiryModule,
    UploadModule,
    SchoolTypesModule,
    SchoolClassificationModule,
    SlugModule,
    AppConfigurationModule,
    PrometheusModule.register({
      pushgateway: {
        url: "http://127.0.0.1:9090",
      },
    }),
    CtaEnquiryModule,
    AppMetricsModule,
    FavoriteSchoolModule,
    LeadsModule,
    TransactionsModule,
    WalletsModule,
    MailsHandlerModule,
    ClaimSchoolEnquiryModule,
    DeleteAccountRequestsModule,
    AuthorModule,
  ],
  providers: [
    AuthModule, UserModule,
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor, name: 'LoggingInterceptor' },
    { provide: APP_INTERCEPTOR, useClass: AppMetricInterceptor, name: 'AppMetricInterceptor' },
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor, name: 'ResponseInterceptor' },
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
  controllers: [AppController],
})
export class AppModule { }
