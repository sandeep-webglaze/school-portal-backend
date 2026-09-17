"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.comparePassword = void 0;
exports.hashUserPassword = hashUserPassword;
exports.toUserObj = toUserObj;
const mongoose_1 = require("mongoose");
const argon2 = require("argon2");
const constants_1 = require("../../../lib/constants");
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    mail: { type: String, unique: true },
    phoneNumber: { type: String, unique: true },
    password: { type: String, required: false },
    role: { type: String, enum: Object.values(constants_1.USER_ROLE), required: true },
    status: {
        type: String,
        enum: Object.values(constants_1.USER_STATUS),
        default: constants_1.USER_STATUS.ACTIVE,
    },
    verificationStatus: {
        type: String,
        enum: Object.values(constants_1.USER_VERIFICATION_STATUS),
        default: constants_1.USER_VERIFICATION_STATUS.PENDING,
    },
    imageUrl: { type: String },
    school: { type: mongoose_1.Types.ObjectId, ref: constants_1.SCHOOL_MODEL },
    lastLoginAt: { type: Date },
    platform: { type: String },
}, { timestamps: true });
UserSchema.index({ mail: 1 }, { unique: true, partialFilterExpression: { mail: { $type: 'string' } } });
UserSchema.index({ phoneNumber: 1 }, {
    unique: true,
    partialFilterExpression: { phoneNumber: { $type: 'string' } },
});
async function hashUserPassword(password) {
    return await argon2.hash(password);
}
function toUserObj(user) {
    const { password, ...userBody } = user.toJSON();
    return userBody;
}
UserSchema.pre('save', async function (next) {
    let user = this;
    if (!user.isModified('password'))
        return next();
    try {
        if (this.password != null && this.password != '')
            this.password = await hashUserPassword(this.password);
        next();
    }
    catch (error) {
        return next(error);
    }
});
const comparePassword = async (param) => {
    return await argon2.verify(param.currentPassword, param.comparePassword);
};
exports.comparePassword = comparePassword;
exports.UserModel = { name: constants_1.USER_MODEL, schema: UserSchema };
//# sourceMappingURL=user.entity.js.map