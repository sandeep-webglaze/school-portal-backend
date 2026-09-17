"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAccountRequestModel = void 0;
const mongoose_1 = require("mongoose");
const constants_1 = require("../../../lib/constants");
const DeleteAccountRequestSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: constants_1.USER_MODEL, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    reason: { type: String },
}, { strict: true, strictQuery: true, timestamps: true });
exports.DeleteAccountRequestModel = { name: constants_1.DELETE_ACCOUNT_REQUESTS_MODEL, schema: DeleteAccountRequestSchema };
//# sourceMappingURL=delete-account-request.entity.js.map