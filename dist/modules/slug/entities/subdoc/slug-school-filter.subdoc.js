"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlugSchoolFilterSchema = void 0;
const mongoose_1 = require("mongoose");
const constants_1 = require("../../../../lib/constants");
exports.SlugSchoolFilterSchema = new mongoose_1.Schema({
    city: { type: mongoose_1.Schema.Types.ObjectId, ref: constants_1.CITY_MODEL },
    classification: { type: mongoose_1.Schema.Types.ObjectId, ref: constants_1.SCHOOL_CLASSIFICATION_MODEL },
    type: { type: mongoose_1.Schema.Types.ObjectId, ref: constants_1.SCHOOL_TYPE_MODEL },
    schoolBoard: { type: mongoose_1.Schema.Types.ObjectId, ref: constants_1.SCHOOL_BOARD_MODEL },
    school: { type: mongoose_1.Schema.Types.ObjectId, ref: constants_1.SCHOOL_MODEL },
});
//# sourceMappingURL=slug-school-filter.subdoc.js.map