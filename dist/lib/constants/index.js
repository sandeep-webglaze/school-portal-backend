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
exports.NOTIFICATION_TTL_SECONDS = exports.FILE_MAX_SIZE_IN_BYTES = exports.OTP_TTL_SECONDS = exports.OTP_LIMIT_IN_DELTA = exports.OTP_DELTA_TIME_MIN = exports.OTP_TIME_OUT_MINUTE = exports.OTP_MAX_RETRIES = exports.OTP_MAX_LENGTH = exports.METHOD_LOG_METADATA = exports.CURRENT_USER_REQ_KEY = exports.AUTH_ROLES_KEY = exports.IGNORE_TRANSFORM_INTERCEPTOR = exports.IGNORE_CACHING = exports.IS_PUBLIC_ROUTE = void 0;
__exportStar(require("./enum"), exports);
__exportStar(require("./models"), exports);
exports.IS_PUBLIC_ROUTE = 'isPublicRoute';
exports.IGNORE_CACHING = 'IGNORE_CACHING';
exports.IGNORE_TRANSFORM_INTERCEPTOR = 'IGNORE_TRANSFORM_INTERCEPTOR';
exports.AUTH_ROLES_KEY = 'roles';
exports.CURRENT_USER_REQ_KEY = 'user';
exports.METHOD_LOG_METADATA = 'METHOD_LOG_METADATA';
exports.OTP_MAX_LENGTH = 6;
exports.OTP_MAX_RETRIES = 5;
exports.OTP_TIME_OUT_MINUTE = 10;
exports.OTP_DELTA_TIME_MIN = 10;
exports.OTP_LIMIT_IN_DELTA = 10;
exports.OTP_TTL_SECONDS = 3600;
exports.FILE_MAX_SIZE_IN_BYTES = 5 * 1024 * 1024;
exports.NOTIFICATION_TTL_SECONDS = 2592000;
//# sourceMappingURL=index.js.map