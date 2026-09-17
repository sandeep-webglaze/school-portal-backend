"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlugMetaDataSchema = void 0;
const mongoose_1 = require("mongoose");
exports.SlugMetaDataSchema = new mongoose_1.Schema({
    title: String,
    description: String,
    keywords: String,
    robots: {
        index: Boolean,
        follow: Boolean,
        noarchive: Boolean,
        nosnippet: Boolean,
        noimageindex: Boolean,
        nocache: Boolean,
        notranslate: Boolean,
        indexifembedded: Boolean,
        nositelinkssearchbox: Boolean,
        unavailable_after: String,
        'max-video-preview': String,
        'max-image-preview': String,
        'max-snippet': Number
    },
    openGraph: {
        locale: String,
        type: String,
        title: String,
        description: String,
        url: String,
        images: String
    },
    twitter: {
        card: String,
        title: String,
        description: String,
        site: String,
        images: String
    }
});
//# sourceMappingURL=slug-meta-data.subdoc.js.map