"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolRequestModel = void 0;
const mongoose_1 = require("mongoose");
const constants_1 = require("../../../lib/constants");
const models_1 = require("../../../lib/constants/models");
const school_entity_1 = require("./school.entity");
const SchoolRequestSchema = new mongoose_1.Schema({
    school: { type: mongoose_1.Types.ObjectId, required: true, ref: models_1.SCHOOL_MODEL },
    status: { type: String, enum: Object.values(constants_1.SCHOOL_REQUEST_STATUS), default: constants_1.SCHOOL_REQUEST_STATUS.PENDING },
    requestedChanges: { type: school_entity_1.SchoolModel.schema, required: true }
}, { timestamps: true });
exports.SchoolRequestModel = { name: models_1.SCHOOL_REQUEST_MODEL, schema: SchoolRequestSchema };
//# sourceMappingURL=school-request.entity.js.map