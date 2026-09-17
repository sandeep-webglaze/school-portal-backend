"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilityModel = void 0;
const mongoose_1 = require("mongoose");
const models_1 = require("../../../lib/constants/models");
const FacilitySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    icon: { type: String, required: true }
});
exports.FacilityModel = { name: models_1.FACILITY_MODEL, schema: FacilitySchema };
//# sourceMappingURL=facility.entity.js.map