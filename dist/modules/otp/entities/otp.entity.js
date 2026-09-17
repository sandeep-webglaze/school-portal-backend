"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpModel = exports.OtpSchema = void 0;
const mongoose_1 = require("mongoose");
const moment = require("moment");
const constants_1 = require("../../../lib/constants");
exports.OtpSchema = new mongoose_1.Schema({
    otp: {
        type: String
    },
    phoneNumber: {
        type: String,
    },
    email: {
        type: String,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(constants_1.OTP_STATUS),
        default: constants_1.OTP_STATUS.CREATED
    },
    timeout: {
        type: Date,
        default: moment(Date.now()).add(constants_1.OTP_TIME_OUT_MINUTE, 'm').toDate(),
        required: true
    },
    retriesLeft: {
        type: Number,
        required: true,
        default: constants_1.OTP_MAX_RETRIES
    }
}, {
    timestamps: true
});
exports.OtpSchema.index({ createdAt: 1 }, { expireAfterSeconds: constants_1.OTP_TTL_SECONDS });
exports.OtpModel = { name: constants_1.OTP_MODEL, schema: exports.OtpSchema };
//# sourceMappingURL=otp.entity.js.map