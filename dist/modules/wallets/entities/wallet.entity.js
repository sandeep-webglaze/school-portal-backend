"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletModel = void 0;
const mongoose_1 = require("mongoose");
const constants_1 = require("../../../lib/constants");
const WalletSchema = new mongoose_1.Schema({
    amount: { type: Number, default: 0 },
    user: { type: mongoose_1.Types.ObjectId, required: true, ref: constants_1.USER_MODEL, unique: true },
    lastPaymentAt: { type: Date }
}, { strict: true, strictQuery: true, timestamps: true });
exports.WalletModel = { name: constants_1.USERS_WALLETS_MODEL, schema: WalletSchema };
//# sourceMappingURL=wallet.entity.js.map