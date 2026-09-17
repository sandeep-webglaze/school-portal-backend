"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityModel = void 0;
const mongoose_1 = require("mongoose");
const models_1 = require("../../../lib/constants/models");
const CitySchema = new mongoose_1.Schema({
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true, unique: true },
    icon: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    isPopularCity: { type: Boolean, default: false },
}, { timestamps: true });
exports.CityModel = { name: models_1.CITY_MODEL, schema: CitySchema };
//# sourceMappingURL=city.entity.js.map