"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CTAEnquiryModel = exports.CTAEnquirySchema = void 0;
const mongoose_1 = require("mongoose");
const constants_1 = require("../../../lib/constants");
exports.CTAEnquirySchema = new mongoose_1.Schema({
    phoneNumber: { type: String, required: true },
    name: { type: String, required: true },
    pageUrl: { type: String, required: true },
}, { timestamps: true });
exports.CTAEnquiryModel = { name: constants_1.CTA_ENQUIRY_MODEL, schema: exports.CTAEnquirySchema };
//# sourceMappingURL=cta-enquiry.entity.js.map