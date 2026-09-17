"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClaimSchoolEnquiryModel = void 0;
const mongoose_1 = require("mongoose");
const constants_1 = require("../../../lib/constants");
const ClaimSchoolEnquirySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    school: { type: String, required: true },
    schoolAddress: { type: String, required: true },
}, { strict: true, strictQuery: true, timestamps: true });
exports.ClaimSchoolEnquiryModel = {
    name: constants_1.CLAIM_SCHOOL_ENQUIRY_MODEL,
    schema: ClaimSchoolEnquirySchema,
};
//# sourceMappingURL=claim-school-enquiry.entity.js.map