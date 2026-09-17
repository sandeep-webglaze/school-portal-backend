"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUndefined = removeUndefined;
exports.slugify = slugify;
__exportStar(require("./create-paginated-params.util"), exports);
__exportStar(require("./retry-wrapper.util"), exports);
function removeUndefined(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.filter((item) => item !== undefined);
    }
    const result = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            const cleanedValue = removeUndefined(value);
            if (cleanedValue !== undefined) {
                result[key] = cleanedValue;
            }
        }
    }
    return Object.keys(result).length > 0 ? result : undefined;
}
function slugify(text) {
    if (text == null || text.trim() === '')
        return text;
    return text
        .trim()
        .toLowerCase()
        .replace(/[^A-Za-z0-9\s]/g, ' ')
        .trim()
        .replace(/\s+/g, '-');
}
//# sourceMappingURL=index.js.map