"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialMediaSchema = void 0;
const mongoose_1 = require("mongoose");
exports.SocialMediaSchema = new mongoose_1.Schema({
    facebook: { type: String },
    intstagram: { type: String },
    tweeter: { type: String },
    linkedIn: { type: String },
    youtube: { type: String },
    pinterest: { type: String },
});
//# sourceMappingURL=socail-media.subdoc.js.map