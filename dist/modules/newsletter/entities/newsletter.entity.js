"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterModel = exports.NewsletterSchema = void 0;
const mongoose_1 = require("mongoose");
const constants_1 = require("../../../lib/constants");
exports.NewsletterSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
}, { timestamps: true });
exports.NewsletterModel = { name: constants_1.NEWSLETTER_MODEL, schema: exports.NewsletterSchema };
//# sourceMappingURL=newsletter.entity.js.map