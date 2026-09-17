"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchasedLeadSchema = void 0;
const mongoose_1 = require("mongoose");
exports.PurchasedLeadSchema = new mongoose_1.Schema({
    lead: { type: mongoose_1.Types.ObjectId, required: true },
    price: { type: Number, required: true }
});
//# sourceMappingURL=purchase_lead.subdoc.js.map