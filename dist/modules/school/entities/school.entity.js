"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolModel = void 0;
const mongoose_1 = require("mongoose");
const models_1 = require("../../../lib/constants/models");
const SchoolSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    chairman: { type: String, required: true },
    medium: { type: String, required: true },
    admissionStart: { type: String, required: true },
    admissionEnd: { type: String, required: true },
    contactNumber: { type: String, required: true },
    mail: { type: String, required: true },
    website: { type: String, required: true },
    about: { type: String, required: true },
    classFrom: { type: String, required: true },
    classTo: { type: String, required: true },
    classification: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: models_1.SCHOOL_CLASSIFICATION_MODEL,
    },
    type: {
        type: [{ type: mongoose_1.Schema.Types.ObjectId, ref: models_1.SCHOOL_TYPE_MODEL }],
        default: [],
    },
    city: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: models_1.CITY_MODEL },
    slug: { type: String, required: true, ref: models_1.SLUG_MODEL, unique: true },
    images: { type: [String], default: [] },
    schoolBoards: {
        type: [{ type: mongoose_1.Schema.Types.ObjectId, ref: models_1.SCHOOL_BOARD_MODEL }],
        default: [],
    },
    facilities: {
        type: [{ type: mongoose_1.Schema.Types.ObjectId, ref: models_1.FACILITY_MODEL }],
        default: [],
    },
    establishmentYear: { type: Number, required: true },
    minFees: { type: Number, required: true },
    maxFees: { type: Number, required: true },
    avgRating: { type: Number, default: 0 },
    avgAcademicsRating: { type: Number, default: 0 },
    avgAddmissionRating: { type: Number, default: 0 },
    avgExtracurriclarRating: { type: Number, default: 0 },
    avgInfrastructureRating: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    published: { type: Boolean, default: false },
    featuredPriority: { type: Number },
}, { timestamps: true });
SchoolSchema.index({ slug: 1 }, { unique: true });
SchoolSchema.index({ name: "text" });
SchoolSchema.index({ classification: 1, type: 1, schoolBoards: 1 });
SchoolSchema.index({ minFees: 1, maxFees: 1 });
SchoolSchema.index({ isFeatured: 1, featuredPriority: 1 });
SchoolSchema.index({ city: 1 });
SchoolSchema.index({ createdAt: -1 });
SchoolSchema.virtual('reviews', {
    justOne: true,
});
SchoolSchema.virtual('isFavorite', {
    ref: models_1.FAVORITE_SCHOOL_MODEL,
    localField: '_id',
    foreignField: 'school',
    justOne: true,
    count: true,
    getters: true
}).get(val => val > 0);
exports.SchoolModel = { name: models_1.SCHOOL_MODEL, schema: SchoolSchema };
//# sourceMappingURL=school.entity.js.map