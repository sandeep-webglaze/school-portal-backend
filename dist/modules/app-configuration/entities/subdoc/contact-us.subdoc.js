"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactUsSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ContactUsSchema = new mongoose_1.Schema({
    phoneNumber: { type: String, required: true },
    mail: { type: String, required: true },
    address: { type: String, required: true }
});
//# sourceMappingURL=contact-us.subdoc.js.map