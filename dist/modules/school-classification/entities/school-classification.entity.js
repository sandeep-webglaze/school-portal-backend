"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolClassificationModel = void 0;
const mongoose_1 = require("mongoose");
const constants_1 = require("../../../lib/constants");
const SchoolClassificationSchema = new mongoose_1.Schema({
    name: { type: String, required: true }
}, { timestamps: true });
exports.SchoolClassificationModel = { name: constants_1.SCHOOL_CLASSIFICATION_MODEL, schema: SchoolClassificationSchema };
//# sourceMappingURL=school-classification.entity.js.map