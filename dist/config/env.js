"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentVariables = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const constants_1 = require("../lib/constants");
class EnvironmentVariables {
}
exports.EnvironmentVariables = EnvironmentVariables;
__decorate([
    (0, class_validator_1.IsEnum)(constants_1.NODE_ENVIRONMENT),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "NODE_ENV", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Invalid APP_NAME' }),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "APP_NAME", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Invalid APP_SCHEMA' }),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "APP_SCHEMA", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'Invalid APP_PORT' }),
    __metadata("design:type", Number)
], EnvironmentVariables.prototype, "APP_PORT", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Invalid APP_ROUTE_PREFIX' }),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "APP_ROUTE_PREFIX", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Invalid WEBSITE_AUTH_CALLBACK_URL' }),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "WEBSITE_AUTH_CALLBACK_URL", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Invalid FILE_CDN_HOST' }),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "FILE_CDN_HOST", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Invalid MONGO_URI' }),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "MONGO_URI", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Invalid MONGO_PASSWORD' }),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "MONGO_PASSWORD", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Invalid JWT_SECRET' }),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "JWT_SECRET", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Invalid REFRESH_SESSION_SECRET' }),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "REFRESH_SESSION_SECRET", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Invalid FORGOT_SESSION_SECRET' }),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "FORGOT_SESSION_SECRET", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Invalid SWAGGER_PATH' }),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "SWAGGER_PATH", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Invalid SWAGGER_USER' }),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "SWAGGER_USER", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Invalid SWAGGER_PASSWORD' }),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "SWAGGER_PASSWORD", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Invalid GOOGLE_CLIENT_ID' }),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "GOOGLE_CLIENT_ID", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Invalid GOOGLE_CLIENT_SECRET' }),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "GOOGLE_CLIENT_SECRET", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Invalid GOOGLE_CALLBACK_URL' }),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "GOOGLE_CALLBACK_URL", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Invalid GOOGLE_API_URL' }),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "GOOGLE_API_URL", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Invalid FACEBOOK_APP_ID' }),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "FACEBOOK_APP_ID", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Invalid FACEBOOK_APP_SECRET' }),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "FACEBOOK_APP_SECRET", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Invalid FACEBOOK_CALLBACK_URL' }),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "FACEBOOK_CALLBACK_URL", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Invalid EDHIPPO_SUPPORT_MAIL' }),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "EDHIPPO_SUPPORT_MAIL", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Invalid EDHIPPO_SUPPORT_MAIL_PASSWORD' }),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "EDHIPPO_SUPPORT_MAIL_PASSWORD", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Invalid EDHIPPO_PORT' }),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "EDHIPPO_PORT", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Invalid EDHIPPO_HOST' }),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "EDHIPPO_HOST", void 0);
__decorate([
    (0, class_validator_1.IsString)({
        each: true,
        message: 'Invalid EDHIPPO_ENQUIRY_NOTIFICATION_MAILS',
    }),
    (0, class_transformer_1.Transform)(({ value }) => {
        return value?.split(',');
    }),
    __metadata("design:type", Array)
], EnvironmentVariables.prototype, "EDHIPPO_ENQUIRY_NOTIFICATION_MAILS", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Invalid WHATSAPP_ENDPOINT' }),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "WHATSAPP_ENDPOINT", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Invalid WHATSAPP_TOKEN' }),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "WHATSAPP_TOKEN", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Invalid WHATSAPP_TEMPLATE_NAME' }),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "WHATSAPP_TEMPLATE_NAME", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Invalid WHATSAPP_TEMPLATE_LANGUAGE' }),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "WHATSAPP_TEMPLATE_LANGUAGE", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Invalid S3_REGION' }),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "S3_REGION", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Invalid S3_BUCKET' }),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "S3_BUCKET", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Invalid S3_BUCKET_PUBLIC_FOLDER' }),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "S3_BUCKET_PUBLIC_FOLDER", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Invalid S3_ACCESS_KEY_ID' }),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "S3_ACCESS_KEY_ID", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Invalid S3_SECRET_ACCESS_KEY' }),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "S3_SECRET_ACCESS_KEY", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Invalid REDIS_HOST' }),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "REDIS_HOST", void 0);
__decorate([
    (0, class_validator_1.IsPositive)({ message: 'Invalid REDIS_PORT' }),
    __metadata("design:type", Number)
], EnvironmentVariables.prototype, "REDIS_PORT", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Invalid REDIS_USERNAME' }),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "REDIS_USERNAME", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Invalid REDIS_PASSWORD' }),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "REDIS_PASSWORD", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Invalid RAZORPAY_KEY_ID' }),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "RAZORPAY_KEY_ID", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Invalid RAZORPAY_KEY_SECRET' }),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "RAZORPAY_KEY_SECRET", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Invalid RAZORPAY_WEBHOOK_SECRET' }),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "RAZORPAY_WEBHOOK_SECRET", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Invalid PASSWORD_SECRET' }),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "PASSWORD_SECRET", void 0);
//# sourceMappingURL=env.js.map