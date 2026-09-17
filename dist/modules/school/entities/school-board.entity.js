"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolBoardModel = void 0;
const mongoose_1 = require("mongoose");
const models_1 = require("../../../lib/constants/models");
const SchoolBoardSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    featured: { type: Boolean, default: false }
}, { timestamps: true });
exports.SchoolBoardModel = { name: models_1.SCHOOL_BOARD_MODEL, schema: SchoolBoardSchema };
//# sourceMappingURL=school-board.entity.js.map