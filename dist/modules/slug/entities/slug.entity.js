"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlugModel = void 0;
const mongoose_1 = require("mongoose");
const constants_1 = require("../../../lib/constants");
const slug_school_filter_subdoc_1 = require("./subdoc/slug-school-filter.subdoc");
const SlugFaqSchema = new mongoose_1.Schema({
    question: { type: String, default: '' },
    answer: { type: String, default: '' },
}, { _id: false });
const SlugSchema = new mongoose_1.Schema({
    slug: { type: String, required: true, unique: true },
    formattedText: { type: String, default: '' },
    slugMetaData: { type: Object, default: {} },
    slugJsonSchema: { type: String, default: '' },
    isHomepageSlug: { type: Boolean, default: false },
    filters: { type: slug_school_filter_subdoc_1.SlugSchoolFilterSchema },
    slugContent: { type: String },
    heroTitle: { type: String, default: '' },
    heroSubtitle: { type: String, default: '' },
    heroImage: { type: String, default: '' },
    faqs: { type: [SlugFaqSchema], default: [] },
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: constants_1.AUTHOR_MODEL, default: null },
    slugType: {
        type: String,
        enum: Object.values(constants_1.SLUG_TYPE),
        default: constants_1.SLUG_TYPE.COMBINATION,
    },
});
exports.SlugModel = { name: constants_1.SLUG_MODEL, schema: SlugSchema };
//# sourceMappingURL=slug.entity.js.map