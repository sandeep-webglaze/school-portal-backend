"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolReviewModel = void 0;
const mongoose_1 = require("mongoose");
const constants_1 = require("../../../lib/constants");
const SchoolReviewSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: constants_1.USER_MODEL },
    schoolId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: constants_1.SCHOOL_MODEL },
    overallRating: { type: Number, required: true },
    review: { type: String, required: true },
    academics: { type: Number, required: true },
    addmission: { type: Number, required: true },
    extracurriclar: { type: Number, required: true },
    infrastructure: { type: Number, required: true },
}, { strict: true, strictQuery: true, timestamps: true });
exports.SchoolReviewModel = { name: constants_1.SCHOOL_REVIEWS_MODEL, schema: SchoolReviewSchema };
//# sourceMappingURL=school-review.entity.js.map