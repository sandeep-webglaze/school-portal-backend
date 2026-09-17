"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionModel = void 0;
const mongoose_1 = require("mongoose");
const constants_1 = require("../../../lib/constants");
const purchase_lead_subdoc_1 = require("./subdoc/purchase_lead.subdoc");
const TransactionSchema = new mongoose_1.Schema({
    transactionId: { type: String, required: true, unique: true },
    paymentMethod: { type: String, required: true },
    amount: { type: Number, required: true },
    user: { type: mongoose_1.Types.ObjectId, required: true, ref: constants_1.USER_MODEL },
    type: { type: String, enum: Object.values(constants_1.TRANSACTION_TYPE), required: true },
    status: { type: String, enum: Object.values(constants_1.TRANSACTION_STATUS), default: constants_1.TRANSACTION_STATUS.PENDING },
    timestamp: { type: Date, required: true },
    orderId: { type: String },
    description: { type: String },
    leads: { type: [purchase_lead_subdoc_1.PurchasedLeadSchema] },
}, { strict: true, strictQuery: true, timestamps: true });
exports.TransactionModel = { name: constants_1.TRANSACTION_MODEL, schema: TransactionSchema };
//# sourceMappingURL=transaction.entity.js.map