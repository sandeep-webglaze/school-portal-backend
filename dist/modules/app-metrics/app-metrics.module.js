"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppMetricsModule = void 0;
const common_1 = require("@nestjs/common");
const app_metrics_service_1 = require("./app-metrics.service");
const app_metrics_1 = require("./app.metrics");
let AppMetricsModule = class AppMetricsModule {
};
exports.AppMetricsModule = AppMetricsModule;
exports.AppMetricsModule = AppMetricsModule = __decorate([
    (0, common_1.Module)({
        providers: [app_metrics_service_1.AppMetricsService, ...app_metrics_1.PROMETHEUS_METRICS_TYPES],
        exports: [app_metrics_service_1.AppMetricsService]
    })
], AppMetricsModule);
//# sourceMappingURL=app-metrics.module.js.map