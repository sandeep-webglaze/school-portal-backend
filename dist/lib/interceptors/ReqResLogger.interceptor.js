"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var LoggingInterceptor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const constants_1 = require("../constants");
let LoggingInterceptor = LoggingInterceptor_1 = class LoggingInterceptor {
    constructor(options) {
        this.ctxPrefix = LoggingInterceptor_1.name;
        this.logger = new common_1.Logger(LoggingInterceptor_1.name);
        this.userPrefix = options?.userPrefix ?? '';
        this.disableMasking = options?.disableMasking ?? false;
        this.maskingPlaceholder = options?.maskingPlaceholder ?? '****';
        this.mask = options?.mask;
    }
    intercept(context, next) {
        const options = Reflect.getMetadata(constants_1.METHOD_LOG_METADATA, context.getHandler());
        const now = Date.now();
        return next.handle().pipe((0, rxjs_1.tap)({
            next: (val) => {
                this.logNext(val, context, now, options);
            },
            error: (err) => {
                this.logError(err, context, now, options);
            },
        }));
    }
    setUserPrefix(prefix) {
        this.userPrefix = `${prefix} - `;
    }
    setDisableMasking(disableMasking) {
        this.disableMasking = disableMasking;
    }
    setMaskingPlaceholder(placeholder) {
        this.maskingPlaceholder = placeholder;
    }
    setMask(mask) {
        this.mask = mask;
    }
    requestBasicInfo(request, response) {
        const { method, originalUrl } = request;
        const userAgent = request.get("user-agent") || "";
        const ip = request.headers['x-forwarded-for'] || request.ip;
        const { statusCode } = response;
        const contentLength = response.get("content-length");
        return {
            method,
            originalUrl,
            statusCode,
            contentLength,
            userAgent,
            ip,
            timestamp: new Date(),
        };
    }
    logNext(body, context, requestTime, options) {
        if (options != null && options.ignoreLog)
            return;
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        const basicRequestMetaInfo = this.requestBasicInfo(request, response);
        const controllerContext = context.getClass().name;
        const responseTime = Date.now() - requestTime;
        let message = `[${basicRequestMetaInfo.ip}] {${basicRequestMetaInfo.originalUrl}, ${basicRequestMetaInfo.method}} route - ${basicRequestMetaInfo.statusCode} ${responseTime}ms`;
        this.logger.log({
            ...basicRequestMetaInfo,
            message,
        }, controllerContext);
    }
    logError(error, context, requestTime, options) {
        if (options != null && options.ignoreLog)
            return;
        const req = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        const basicRequestMetaInfo = this.requestBasicInfo(req, response);
        const controllerContext = context.getClass().name;
        const responseTime = Date.now() - requestTime;
        if (error instanceof common_1.HttpException) {
            const statusCode = error.getStatus();
            const message = `[${basicRequestMetaInfo.ip}] {${basicRequestMetaInfo.originalUrl}, ${basicRequestMetaInfo.method}} route - ${statusCode} ${responseTime}ms`;
            const maskedBody = options?.mask?.request ? this.maskData(req.body, options.mask.request) : req.body;
            if (statusCode >= common_1.HttpStatus.INTERNAL_SERVER_ERROR) {
                this.logger.error({
                    ...basicRequestMetaInfo,
                    body: maskedBody,
                    message,
                    error,
                }, error.stack, controllerContext);
            }
            else {
                this.logger.warn({
                    ...basicRequestMetaInfo,
                    error,
                    body: maskedBody,
                    message,
                }, controllerContext);
            }
        }
        else {
            this.logger.error({
                message: `[${basicRequestMetaInfo.ip}] {${basicRequestMetaInfo.originalUrl}, ${basicRequestMetaInfo.method}} route - ${responseTime}ms`,
            }, error.stack, controllerContext);
        }
    }
    maskData(data, maskingOptions, path = '') {
        const parsedData = JSON.parse(JSON.stringify(data));
        if (this.disableMasking) {
            return parsedData;
        }
        if (maskingOptions === true || maskingOptions.includes(path)) {
            return this.maskingPlaceholder;
        }
        if (Array.isArray(parsedData)) {
            return parsedData.map((item) => this.maskData(item, maskingOptions, path));
        }
        if (typeof parsedData === 'object' && parsedData !== null) {
            return Object.keys(parsedData).reduce((maskedObject, key) => {
                const nestedPath = path ? `${path}.${key}` : key;
                return {
                    ...maskedObject,
                    [key]: this.maskData(parsedData[key], maskingOptions, nestedPath),
                };
            }, {});
        }
        return parsedData;
    }
    maskHeaders(headers) {
        if (this.disableMasking || this.mask?.requestHeader === undefined) {
            return headers;
        }
        return Object.keys(headers).reduce((maskedHeaders, headerKey) => {
            const headerValue = headers[headerKey];
            const mask = this.mask?.requestHeader?.[headerKey];
            if (headerValue === undefined) {
                return maskedHeaders;
            }
            if (mask === true) {
                return {
                    ...maskedHeaders,
                    [headerKey]: this.maskingPlaceholder,
                };
            }
            if (typeof mask === 'function') {
                try {
                    return {
                        ...maskedHeaders,
                        [headerKey]: mask(headerValue),
                    };
                }
                catch (err) {
                    this.logger.warn(`LoggingInterceptor - Masking error for header ${headerKey}`, err);
                    return {
                        ...maskedHeaders,
                        [headerKey]: this.maskingPlaceholder,
                    };
                }
            }
            return maskedHeaders;
        }, headers);
    }
};
exports.LoggingInterceptor = LoggingInterceptor;
exports.LoggingInterceptor = LoggingInterceptor = LoggingInterceptor_1 = __decorate([
    __param(0, (0, common_1.Optional)()),
    __metadata("design:paramtypes", [Object])
], LoggingInterceptor);
//# sourceMappingURL=ReqResLogger.interceptor.js.map