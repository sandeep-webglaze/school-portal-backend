"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const caching_config_1 = require("../../config/caching.config");
const slug_module_1 = require("../slug/slug.module");
const upload_module_1 = require("../upload/upload.module");
const city_service_1 = require("./city.service");
const city_controller_1 = require("./city.controller");
const city_entity_1 = require("./entities/city.entity");
const city_repository_1 = require("./city.repository");
let CityModule = class CityModule {
};
exports.CityModule = CityModule;
exports.CityModule = CityModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([city_entity_1.CityModel]), caching_config_1.CachingModule, slug_module_1.SlugModule, upload_module_1.UploadModule],
        controllers: [city_controller_1.CityController],
        providers: [city_repository_1.CityRepository, city_service_1.CityService],
        exports: [city_service_1.CityService]
    })
], CityModule);
//# sourceMappingURL=city.module.js.map