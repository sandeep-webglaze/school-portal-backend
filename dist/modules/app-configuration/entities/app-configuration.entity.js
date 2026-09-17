"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConfigurationModel = void 0;
const mongoose_1 = require("mongoose");
const models_1 = require("../../../lib/constants/models");
const contact_us_subdoc_1 = require("./subdoc/contact-us.subdoc");
const socail_media_subdoc_1 = require("./subdoc/socail-media.subdoc");
const AppCongifSchema = new mongoose_1.Schema({
    contactUs: { type: contact_us_subdoc_1.ContactUsSchema, required: true },
    termsAndConditions: { type: String },
    privacyPolicy: { type: String },
    refundPolicy: { type: String },
    aboutUs: { type: String },
    defaultSlugMetaData: { type: Object, default: {} },
    defaultSlugJsonSchema: { type: String },
    robots: { type: String },
    socialMedia: socail_media_subdoc_1.SocialMediaSchema
});
exports.AppConfigurationModel = { name: models_1.APPCONFIGURATIONS_MODEL, schema: AppCongifSchema };
//# sourceMappingURL=app-configuration.entity.js.map