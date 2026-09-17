"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolEnquiryModel = void 0;
const mongoose_1 = require("mongoose");
const constants_1 = require("../../../lib/constants");
const SchoolEnquirySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    schoolType: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: constants_1.SCHOOL_TYPE_MODEL,
    },
    city: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: constants_1.CITY_MODEL },
    class: { type: String, required: true },
    userIp: { type: String, required: true },
    pageUrl: { type: String, required: true },
    submittedAt: { type: Date, default: Date.now() },
    gender: { type: String, enum: Object.values(constants_1.GENDER), required: true },
    status: {
        type: String,
        enum: Object.values(constants_1.SCHOOL_ENQUIRY_STATUS),
        default: constants_1.SCHOOL_ENQUIRY_STATUS.PENDING,
    },
    platform: { type: String },
    message: { type: String },
}, { strict: true, strictQuery: true, timestamps: true });
exports.SchoolEnquiryModel = {
    name: constants_1.SCHOOL_ENQUIRY_MODEL,
    schema: SchoolEnquirySchema,
};
//# sourceMappingURL=school-enquiry.entity.js.map