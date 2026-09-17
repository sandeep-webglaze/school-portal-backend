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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("./modules/auth/guards/jwt.guard");
const nestjs_prometheus_1 = require("@willsoto/nestjs-prometheus");
const Response_interceptor_1 = require("./lib/interceptors/Response.interceptor");
const log_decorator_1 = require("./lib/decorators/log.decorator");
const swagger_1 = require("@nestjs/swagger");
let AppController = class AppController extends nestjs_prometheus_1.PrometheusController {
    getHello() {
        return 'Server Running Fine!';
    }
    getHealth(req) {
        return { domain: req.hostname, host: req.get('host') };
    }
    async index(response) {
        return super.index(response);
    }
};
exports.AppController = AppController;
__decorate([
    (0, jwt_guard_1.Public)(),
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Server Running Fine.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, jwt_guard_1.Public)(),
    (0, common_1.Get)('/health'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Server is Healthy.' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getHealth", null);
__decorate([
    (0, jwt_guard_1.Public)(),
    (0, log_decorator_1.Log)({ ignoreLog: true }),
    (0, Response_interceptor_1.IgnoreTransformInterceptor)(),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Server Prometheus Metrics.' }),
    (0, common_1.Get)('metrics'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Response]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "index", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)()
], AppController);
//# sourceMappingURL=app.controller.js.map