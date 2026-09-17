"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteSchoolModel = exports.FavoriteSchema = void 0;
const mongoose_1 = require("mongoose");
const constants_1 = require("../../../lib/constants");
exports.FavoriteSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: constants_1.USER_MODEL },
    school: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: constants_1.SCHOOL_MODEL },
}, { timestamps: true });
exports.FavoriteSchema.index({ user: 1, school: 1 }, { unique: true });
exports.FavoriteSchoolModel = { name: constants_1.FAVORITE_SCHOOL_MODEL, schema: exports.FavoriteSchema };
//# sourceMappingURL=favorite-school.entity.js.map