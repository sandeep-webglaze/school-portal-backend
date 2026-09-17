import { Schema } from 'mongoose';

import { APPCONFIGURATIONS_MODEL } from '@/src/lib/constants/models';
import { IAppConfig } from '../interface';
import { ContactUsSchema } from './subdoc/contact-us.subdoc';
import { SocialMediaSchema } from './subdoc/socail-media.subdoc';

const AppCongifSchema = new Schema<IAppConfig>({
    contactUs: { type: ContactUsSchema, required: true },
    termsAndConditions: { type: String },
    privacyPolicy: { type: String },
    refundPolicy: { type: String },
    aboutUs: { type: String },
    defaultSlugMetaData: { type: Object, default: {} },
    defaultSlugJsonSchema: { type: String },
    robots: { type: String },
    socialMedia: SocialMediaSchema
});

export const AppConfigurationModel = { name: APPCONFIGURATIONS_MODEL, schema: AppCongifSchema };
