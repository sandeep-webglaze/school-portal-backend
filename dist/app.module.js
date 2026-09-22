"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const throttler_1 = require("@nestjs/throttler");
const nestjs_prometheus_1 = require("@willsoto/nestjs-prometheus");
const mongoose_config_1 = require("./config/mongoose.config");
const rate_limit_config_1 = require("./config/rate-limit.config");
const caching_config_1 = require("./config/caching.config");
const app_controller_1 = require("./app.controller");
const config_module_1 = require("./config/config.module");
const school_module_1 = require("./modules/school/school.module");
const city_module_1 = require("./modules/city/city.module");
const user_module_1 = require("./modules/user/user.module");
const auth_module_1 = require("./modules/auth/auth.module");
const Response_interceptor_1 = require("./lib/interceptors/Response.interceptor");
const school_review_module_1 = require("./modules/school-review/school-review.module");
const homepage_module_1 = require("./modules/homepage/homepage.module");
const otp_module_1 = require("./modules/otp/otp.module");
const school_enquiry_module_1 = require("./modules/school-enquiry/school-enquiry.module");
const upload_module_1 = require("./modules/upload/upload.module");
const school_types_module_1 = require("./modules/school-types/school-types.module");
const school_classification_module_1 = require("./modules/school-classification/school-classification.module");
const slug_module_1 = require("./modules/slug/slug.module");
const app_configuration_module_1 = require("./modules/app-configuration/app-configuration.module");
const ReqResLogger_interceptor_1 = require("./lib/interceptors/ReqResLogger.interceptor");
const cta_enquiry_module_1 = require("./modules/cta-enquiry/cta-enquiry.module");
const newsletter_module_1 = require("./modules/newsletter/newsletter.module");
const AppMetric_interceptor_1 = require("./lib/interceptors/AppMetric.interceptor");
const app_metrics_module_1 = require("./modules/app-metrics/app-metrics.module");
const favorite_school_module_1 = require("./modules/favorite-school/favorite-school.module");
const leads_module_1 = require("./modules/leads/leads.module");
const transactions_module_1 = require("./modules/transactions/transactions.module");
const wallets_module_1 = require("./modules/wallets/wallets.module");
const mails_handler_module_1 = require("./modules/mails-handler/mails-handler.module");
const claim_school_enquiry_module_1 = require("./modules/claim-school-enquiry/claim-school-enquiry.module");
const delete_account_requests_module_1 = require("./modules/delete-account-requests/delete-account-requests.module");
const author_module_1 = require("./modules/author/author.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_module_1.ConfigModule,
            mongoose_config_1.default,
            caching_config_1.CachingModule,
            rate_limit_config_1.default,
            school_module_1.SchoolModule,
            city_module_1.CityModule,
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            school_review_module_1.SchoolReviewModule,
            homepage_module_1.HomepageModule,
            otp_module_1.OtpModule,
            newsletter_module_1.NewsletterModule,
            school_enquiry_module_1.SchoolEnquiryModule,
            upload_module_1.UploadModule,
            school_types_module_1.SchoolTypesModule,
            school_classification_module_1.SchoolClassificationModule,
            slug_module_1.SlugModule,
            app_configuration_module_1.AppConfigurationModule,
            nestjs_prometheus_1.PrometheusModule.register({
                pushgateway: {
                    url: "http://127.0.0.1:9090",
                },
            }),
            cta_enquiry_module_1.CtaEnquiryModule,
            app_metrics_module_1.AppMetricsModule,
            favorite_school_module_1.FavoriteSchoolModule,
            leads_module_1.LeadsModule,
            transactions_module_1.TransactionsModule,
            wallets_module_1.WalletsModule,
            mails_handler_module_1.MailsHandlerModule,
            claim_school_enquiry_module_1.ClaimSchoolEnquiryModule,
            delete_account_requests_module_1.DeleteAccountRequestsModule,
            author_module_1.AuthorModule,
        ],
        providers: [
            auth_module_1.AuthModule, user_module_1.UserModule,
            { provide: core_1.APP_INTERCEPTOR, useClass: ReqResLogger_interceptor_1.LoggingInterceptor, name: 'LoggingInterceptor' },
            { provide: core_1.APP_INTERCEPTOR, useClass: AppMetric_interceptor_1.AppMetricInterceptor, name: 'AppMetricInterceptor' },
            { provide: core_1.APP_INTERCEPTOR, useClass: Response_interceptor_1.TransformInterceptor, name: 'ResponseInterceptor' },
            { provide: core_1.APP_GUARD, useClass: throttler_1.ThrottlerGuard },
        ],
        controllers: [app_controller_1.AppController],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map