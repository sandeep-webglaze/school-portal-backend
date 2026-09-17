"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolTypeModel = void 0;
const mongoose_1 = require("mongoose");
const constants_1 = require("../../../lib/constants");
const SchoolTypeSchema = new mongoose_1.Schema({
    name: { type: String, required: true }
}, { timestamps: true });
exports.SchoolTypeModel = { name: constants_1.SCHOOL_TYPE_MODEL, schema: SchoolTypeSchema };
//# sourceMappingURL=school-type.entity.js.map