"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConfigurationModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const caching_config_1 = require("../../config/caching.config");
const app_configuration_service_1 = require("./app-configuration.service");
const app_configuration_controller_1 = require("./app-configuration.controller");
const app_configuration_entity_1 = require("./entities/app-configuration.entity");
const app_configuration_repository_1 = require("./app-configuration.repository");
let AppConfigurationModule = class AppConfigurationModule {
};
exports.AppConfigurationModule = AppConfigurationModule;
exports.AppConfigurationModule = AppConfigurationModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([app_configuration_entity_1.AppConfigurationModel]), caching_config_1.CachingModule],
        controllers: [app_configuration_controller_1.AppConfigurationController],
        providers: [app_configuration_repository_1.AppConfigurationRepository, app_configuration_service_1.AppConfigurationService],
        exports: [app_configuration_service_1.AppConfigurationService]
    })
], AppConfigurationModule);
//# sourceMappingURL=app-configuration.module.js.map