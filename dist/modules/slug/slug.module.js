"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlugModule = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const caching_config_1 = require("../../config/caching.config");
const city_module_1 = require("../city/city.module");
const school_module_1 = require("../school/school.module");
const app_configuration_module_1 = require("../app-configuration/app-configuration.module");
const slug_service_1 = require("./slug.service");
const slug_controller_1 = require("./slug.controller");
const slug_repository_1 = require("./slug.repository");
const slug_entity_1 = require("./entities/slug.entity");
const author_entity_1 = require("../author/entities/author.entity");
let SlugModule = class SlugModule {
};
exports.SlugModule = SlugModule;
exports.SlugModule = SlugModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([slug_entity_1.SlugModel, author_entity_1.AuthorModel]), caching_config_1.CachingModule, app_configuration_module_1.AppConfigurationModule, (0, common_1.forwardRef)(() => school_module_1.SchoolModule), (0, common_1.forwardRef)(() => city_module_1.CityModule)],
        controllers: [slug_controller_1.SlugController],
        providers: [slug_repository_1.SlugRepository, slug_service_1.SlugService],
        exports: [slug_service_1.SlugService]
    })
], SlugModule);
//# sourceMappingURL=slug.module.js.map