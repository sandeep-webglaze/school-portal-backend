"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLATFORMS = exports.PROPERTY_PAYMENT_METHOD = exports.TRANSACTION_STATUS = exports.TRANSACTION_TYPE = exports.WALLET_PAYMENT_TYPE = exports.SCHOOL_ENQUIRY_STATUS = exports.SCHOOL_REQUEST_STATUS = exports.SCHOOL_TYPE = exports.SCHOOL_BOARD = exports.SCHOOL_CLASSIFICATION = exports.OTP_STATUS = exports.OTP_TYPES = exports.USER_VERIFICATION_STATUS = exports.USER_STATUS = exports.USER_ROLE = exports.FILE_TYPE = exports.SLUG_TYPE = exports.NODE_ENVIRONMENT = exports.SORTING_TYPE = exports.GENDER = void 0;
var GENDER;
(function (GENDER) {
    GENDER["MALE"] = "male";
    GENDER["FEMALE"] = "female";
    GENDER["OTHER"] = "other";
})(GENDER || (exports.GENDER = GENDER = {}));
var SORTING_TYPE;
(function (SORTING_TYPE) {
    SORTING_TYPE["ASC"] = "asc";
    SORTING_TYPE["DESC"] = "desc";
})(SORTING_TYPE || (exports.SORTING_TYPE = SORTING_TYPE = {}));
var NODE_ENVIRONMENT;
(function (NODE_ENVIRONMENT) {
    NODE_ENVIRONMENT["DEVELOPMENT"] = "development";
    NODE_ENVIRONMENT["PRODUCTION"] = "production";
})(NODE_ENVIRONMENT || (exports.NODE_ENVIRONMENT = NODE_ENVIRONMENT = {}));
var SLUG_TYPE;
(function (SLUG_TYPE) {
    SLUG_TYPE["COMBINATION"] = "combination";
    SLUG_TYPE["INDIVIDUAL"] = "individual";
})(SLUG_TYPE || (exports.SLUG_TYPE = SLUG_TYPE = {}));
var FILE_TYPE;
(function (FILE_TYPE) {
    FILE_TYPE["PROFILE"] = "user-images";
    FILE_TYPE["ICON"] = "icons";
    FILE_TYPE["SCHOOL"] = "school-images";
    FILE_TYPE["SEO_IMAGES"] = "seo-images";
    FILE_TYPE["NEW_SCHOOL_IMAGES"] = "new-school-images";
})(FILE_TYPE || (exports.FILE_TYPE = FILE_TYPE = {}));
var USER_ROLE;
(function (USER_ROLE) {
    USER_ROLE["ADMIN"] = "admin";
    USER_ROLE["SUB_ADMIN"] = "sub-admin";
    USER_ROLE["SCHOOL_ADMIN"] = "school-admin";
    USER_ROLE["USER"] = "user";
})(USER_ROLE || (exports.USER_ROLE = USER_ROLE = {}));
var USER_STATUS;
(function (USER_STATUS) {
    USER_STATUS["ACTIVE"] = "active";
    USER_STATUS["BLOCK"] = "block";
})(USER_STATUS || (exports.USER_STATUS = USER_STATUS = {}));
var USER_VERIFICATION_STATUS;
(function (USER_VERIFICATION_STATUS) {
    USER_VERIFICATION_STATUS["PENDING"] = "pending";
    USER_VERIFICATION_STATUS["VERIFIED"] = "verified";
    USER_VERIFICATION_STATUS["REJECTED"] = "rejected";
})(USER_VERIFICATION_STATUS || (exports.USER_VERIFICATION_STATUS = USER_VERIFICATION_STATUS = {}));
var OTP_TYPES;
(function (OTP_TYPES) {
    OTP_TYPES["MOBILE"] = "mobile";
    OTP_TYPES["EMAIL"] = "email";
    OTP_TYPES["BOTH"] = "mobile-email";
})(OTP_TYPES || (exports.OTP_TYPES = OTP_TYPES = {}));
var OTP_STATUS;
(function (OTP_STATUS) {
    OTP_STATUS["CREATED"] = "created";
    OTP_STATUS["PENDING"] = "pending";
    OTP_STATUS["FAILURE"] = "failure";
    OTP_STATUS["SUCCESS"] = "success";
})(OTP_STATUS || (exports.OTP_STATUS = OTP_STATUS = {}));
var SCHOOL_CLASSIFICATION;
(function (SCHOOL_CLASSIFICATION) {
    SCHOOL_CLASSIFICATION["CO_ED"] = "coed";
    SCHOOL_CLASSIFICATION["GIRLS"] = "girls";
    SCHOOL_CLASSIFICATION["BOYS"] = "boys";
})(SCHOOL_CLASSIFICATION || (exports.SCHOOL_CLASSIFICATION = SCHOOL_CLASSIFICATION = {}));
var SCHOOL_BOARD;
(function (SCHOOL_BOARD) {
    SCHOOL_BOARD["CBSE"] = "cbse";
    SCHOOL_BOARD["ICSE_ISC"] = "icse-isc";
    SCHOOL_BOARD["IB"] = "ib";
    SCHOOL_BOARD["IGCSE"] = "igcse";
    SCHOOL_BOARD["OTHER"] = "other";
})(SCHOOL_BOARD || (exports.SCHOOL_BOARD = SCHOOL_BOARD = {}));
var SCHOOL_TYPE;
(function (SCHOOL_TYPE) {
    SCHOOL_TYPE["DAY"] = "day";
    SCHOOL_TYPE["BOARDING"] = "boarding";
    SCHOOL_TYPE["BOTH"] = "day boarding";
})(SCHOOL_TYPE || (exports.SCHOOL_TYPE = SCHOOL_TYPE = {}));
var SCHOOL_REQUEST_STATUS;
(function (SCHOOL_REQUEST_STATUS) {
    SCHOOL_REQUEST_STATUS["ACCEPTED"] = "accepted";
    SCHOOL_REQUEST_STATUS["REJECTED"] = "rejected";
    SCHOOL_REQUEST_STATUS["PENDING"] = "pending";
})(SCHOOL_REQUEST_STATUS || (exports.SCHOOL_REQUEST_STATUS = SCHOOL_REQUEST_STATUS = {}));
var SCHOOL_ENQUIRY_STATUS;
(function (SCHOOL_ENQUIRY_STATUS) {
    SCHOOL_ENQUIRY_STATUS["ACCEPTED"] = "accepted";
    SCHOOL_ENQUIRY_STATUS["REJECTED"] = "rejected";
    SCHOOL_ENQUIRY_STATUS["PENDING"] = "pending";
})(SCHOOL_ENQUIRY_STATUS || (exports.SCHOOL_ENQUIRY_STATUS = SCHOOL_ENQUIRY_STATUS = {}));
var WALLET_PAYMENT_TYPE;
(function (WALLET_PAYMENT_TYPE) {
    WALLET_PAYMENT_TYPE["CREDIT"] = "credit";
    WALLET_PAYMENT_TYPE["DEBIT"] = "debit";
})(WALLET_PAYMENT_TYPE || (exports.WALLET_PAYMENT_TYPE = WALLET_PAYMENT_TYPE = {}));
var TRANSACTION_TYPE;
(function (TRANSACTION_TYPE) {
    TRANSACTION_TYPE["CREDIT"] = "credit";
    TRANSACTION_TYPE["DEBIT"] = "debit";
    TRANSACTION_TYPE["PURCHASE"] = "purchase_leads";
})(TRANSACTION_TYPE || (exports.TRANSACTION_TYPE = TRANSACTION_TYPE = {}));
var TRANSACTION_STATUS;
(function (TRANSACTION_STATUS) {
    TRANSACTION_STATUS["SUCCESS"] = "success";
    TRANSACTION_STATUS["FAILED"] = "failed";
    TRANSACTION_STATUS["PENDING"] = "pending";
})(TRANSACTION_STATUS || (exports.TRANSACTION_STATUS = TRANSACTION_STATUS = {}));
var PROPERTY_PAYMENT_METHOD;
(function (PROPERTY_PAYMENT_METHOD) {
    PROPERTY_PAYMENT_METHOD["RAZORPAY"] = "razorpay";
})(PROPERTY_PAYMENT_METHOD || (exports.PROPERTY_PAYMENT_METHOD = PROPERTY_PAYMENT_METHOD = {}));
var PLATFORMS;
(function (PLATFORMS) {
    PLATFORMS["SOD"] = "SOD";
    PLATFORMS["EDHIPPO"] = "EDHIPPO";
    PLATFORMS["EDHIPPO_APP"] = "EDHIPPO_APP";
})(PLATFORMS || (exports.PLATFORMS = PLATFORMS = {}));
//# sourceMappingURL=enum.js.map