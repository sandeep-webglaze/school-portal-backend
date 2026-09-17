"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadModel = void 0;
const mongoose_1 = require("mongoose");
const constants_1 = require("../../../lib/constants");
const LeadSchema = new mongoose_1.Schema({
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
    gender: { type: String, enum: Object.values(constants_1.GENDER), required: true },
    actualPrice: { type: Number, required: true },
    currentPrice: { type: Number, required: true },
    generatedAt: { type: Date, default: Date.now() },
    freezed: { type: Boolean, default: false },
    owner: { type: mongoose_1.Types.ObjectId, ref: constants_1.USER_MODEL },
}, { strict: true, strictQuery: true, timestamps: true });
exports.LeadModel = { name: constants_1.LEAD_MODEL, schema: LeadSchema };
//# sourceMappingURL=lead.entity.js.map