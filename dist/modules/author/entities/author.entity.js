"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorModel = void 0;
const mongoose_1 = require("mongoose");
const models_1 = require("../../../lib/constants/models");
const AuthorStatSchema = new mongoose_1.Schema({
    value: { type: String, default: '' },
    label: { type: String, default: '' },
}, { _id: false });
const AuthorCardSchema = new mongoose_1.Schema({
    icon: { type: String, default: '' },
    title: { type: String, default: '' },
    description: { type: String, default: '' },
}, { _id: false });
const AuthorSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    designation: { type: String, default: '' },
    photo: { type: String, default: '' },
    shortBio: { type: String, default: '' },
    fullBioHtml: { type: String, default: '' },
    quote: { type: String, default: '' },
    linkedinUrl: { type: String, default: '' },
    whatsappNumber: { type: String, default: '' },
    stats: { type: [AuthorStatSchema], default: [] },
    specialisations: { type: [AuthorCardSchema], default: [] },
    credentials: { type: [AuthorCardSchema], default: [] },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
exports.AuthorModel = { name: models_1.AUTHOR_MODEL, schema: AuthorSchema };
//# sourceMappingURL=author.entity.js.map