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
exports.AppMetricsService = void 0;
const prom_client_1 = require("prom-client");
const common_1 = require("@nestjs/common");
const nestjs_prometheus_1 = require("@willsoto/nestjs-prometheus");
let AppMetricsService = class AppMetricsService {
    constructor(total_requests, error_requests, error_database, error_application, error_unknown) {
        this.total_requests = total_requests;
        this.error_requests = error_requests;
        this.error_database = error_database;
        this.error_application = error_application;
        this.error_unknown = error_unknown;
    }
};
exports.AppMetricsService = AppMetricsService;
exports.AppMetricsService = AppMetricsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_prometheus_1.InjectMetric)('total_requests')),
    __param(1, (0, nestjs_prometheus_1.InjectMetric)('error_requests')),
    __param(2, (0, nestjs_prometheus_1.InjectMetric)('error_database')),
    __param(3, (0, nestjs_prometheus_1.InjectMetric)('error_application')),
    __param(4, (0, nestjs_prometheus_1.InjectMetric)('error_unknown')),
    __metadata("design:paramtypes", [prom_client_1.Counter,
        prom_client_1.Counter,
        prom_client_1.Counter,
        prom_client_1.Counter,
        prom_client_1.Counter])
], AppMetricsService);
//# sourceMappingURL=app-metrics.service.js.map