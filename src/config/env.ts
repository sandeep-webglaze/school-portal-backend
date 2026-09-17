import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsPositive, IsString } from 'class-validator';

import { NODE_ENVIRONMENT } from '../lib/constants';

export class EnvironmentVariables {
  // ******************** >>> Common Configuration <<< ***********************
  @IsEnum(NODE_ENVIRONMENT)
  NODE_ENV: string;

  @IsString({ message: 'Invalid APP_NAME' })
  APP_NAME: string;

  @IsString({ message: 'Invalid APP_SCHEMA' })
  APP_SCHEMA: string;

  @IsNumber({}, { message: 'Invalid APP_PORT' })
  APP_PORT: number;

  @IsString({ message: 'Invalid APP_ROUTE_PREFIX' })
  APP_ROUTE_PREFIX: string;

  @IsString({ message: 'Invalid WEBSITE_AUTH_CALLBACK_URL' })
  WEBSITE_AUTH_CALLBACK_URL: string;

  @IsString({ message: 'Invalid FILE_CDN_HOST' })
  FILE_CDN_HOST: string;

  // ******************** >>> Database Configuration <<< **********************

  @IsString({ message: 'Invalid MONGO_URI' })
  MONGO_URI: string;

  @IsString({ message: 'Invalid MONGO_PASSWORD' })
  MONGO_PASSWORD: string;

  // ******************** >>> Secrets key Configuration <<< ********************

  @IsString({ message: 'Invalid JWT_SECRET' })
  JWT_SECRET: string;

  @IsString({ message: 'Invalid REFRESH_SESSION_SECRET' })
  REFRESH_SESSION_SECRET: string;

  @IsString({ message: 'Invalid FORGOT_SESSION_SECRET' })
  FORGOT_SESSION_SECRET: string;

  // ******************** >>> Swagger Configuration <<< **********************

  @IsString({ message: 'Invalid SWAGGER_PATH' })
  SWAGGER_PATH: string;

  @IsString({ message: 'Invalid SWAGGER_USER' })
  SWAGGER_USER: string;

  @IsString({ message: 'Invalid SWAGGER_PASSWORD' })
  SWAGGER_PASSWORD: string;

  // ******************** >>> Google Configuration <<< *************************

  @IsString({ message: 'Invalid GOOGLE_CLIENT_ID' })
  GOOGLE_CLIENT_ID: string;

  @IsString({ message: 'Invalid GOOGLE_CLIENT_SECRET' })
  GOOGLE_CLIENT_SECRET: string;

  @IsString({ message: 'Invalid GOOGLE_CALLBACK_URL' })
  GOOGLE_CALLBACK_URL: string;

  @IsString({ message: 'Invalid GOOGLE_API_URL' })
  GOOGLE_API_URL: string;

  // ******************** >>> Facebook Configuration <<< *************************

  @IsString({ message: 'Invalid FACEBOOK_APP_ID' })
  FACEBOOK_APP_ID: string;

  @IsString({ message: 'Invalid FACEBOOK_APP_SECRET' })
  FACEBOOK_APP_SECRET: string;

  @IsString({ message: 'Invalid FACEBOOK_CALLBACK_URL' })
  FACEBOOK_CALLBACK_URL: string;

  // ******************** >>> Mail Configuration <<< *************************

  @IsString({ message: 'Invalid EDHIPPO_SUPPORT_MAIL' })
  EDHIPPO_SUPPORT_MAIL: string;

  @IsString({ message: 'Invalid EDHIPPO_SUPPORT_MAIL_PASSWORD' })
  EDHIPPO_SUPPORT_MAIL_PASSWORD: string;

  @IsString({ message: 'Invalid EDHIPPO_PORT' })
  EDHIPPO_PORT: string;

  @IsString({ message: 'Invalid EDHIPPO_HOST' })
  EDHIPPO_HOST: string;

  @IsString({
    each: true,
    message: 'Invalid EDHIPPO_ENQUIRY_NOTIFICATION_MAILS',
  })
  @Transform(({ value }) => {
    return value?.split(',');
  })
  EDHIPPO_ENQUIRY_NOTIFICATION_MAILS: string[];

  // ******************** >>> TextLocal Configuration <<< *************************

  @IsString({ message: 'Invalid WHATSAPP_ENDPOINT' })
  WHATSAPP_ENDPOINT: string;

  @IsString({ message: 'Invalid WHATSAPP_TOKEN' })
  WHATSAPP_TOKEN: string;

  @IsString({ message: 'Invalid WHATSAPP_TEMPLATE_NAME' })
  WHATSAPP_TEMPLATE_NAME: string;

  @IsString({ message: 'Invalid WHATSAPP_TEMPLATE_LANGUAGE' })
  WHATSAPP_TEMPLATE_LANGUAGE: string;

  // ******************** >>> AWS S3 Bucket Configuration <<< **********************

  @IsString({ message: 'Invalid S3_REGION' })
  S3_REGION: string;

  @IsString({ message: 'Invalid S3_BUCKET' })
  S3_BUCKET: string;

  @IsString({ message: 'Invalid S3_BUCKET_PUBLIC_FOLDER' })
  S3_BUCKET_PUBLIC_FOLDER: string;

  @IsString({ message: 'Invalid S3_ACCESS_KEY_ID' })
  S3_ACCESS_KEY_ID: string;

  @IsString({ message: 'Invalid S3_SECRET_ACCESS_KEY' })
  S3_SECRET_ACCESS_KEY: string;

  // ******************** >>> Redis Configuration <<< **********************

  @IsString({ message: 'Invalid REDIS_HOST' })
  REDIS_HOST: string;

  @IsPositive({ message: 'Invalid REDIS_PORT' })
  REDIS_PORT: number;

  @IsString({ message: 'Invalid REDIS_USERNAME' })
  REDIS_USERNAME: string;

  @IsString({ message: 'Invalid REDIS_PASSWORD' })
  REDIS_PASSWORD: string;

  // ******************** >>> Razorpay Configuration <<< **********************

  @IsString({ message: 'Invalid RAZORPAY_KEY_ID' })
  RAZORPAY_KEY_ID: string;

  @IsString({ message: 'Invalid RAZORPAY_KEY_SECRET' })
  RAZORPAY_KEY_SECRET: string;

  @IsString({ message: 'Invalid RAZORPAY_WEBHOOK_SECRET' })
  RAZORPAY_WEBHOOK_SECRET: string;

  @IsString({ message: 'Invalid PASSWORD_SECRET' })
  PASSWORD_SECRET: string;
}
