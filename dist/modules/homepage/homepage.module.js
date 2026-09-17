"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomepageModule = void 0;
const common_1 = require("@nestjs/common");
const caching_config_1 = require("../../config/caching.config");
const city_module_1 = require("../city/city.module");
const slug_module_1 = require("../slug/slug.module");
const school_module_1 = require("../school/school.module");
const school_types_module_1 = require("../school-types/school-types.module");
const school_classification_module_1 = require("../school-classification/school-classification.module");
const homepage_service_1 = require("./homepage.service");
const homepage_controller_1 = require("./homepage.controller");
const wallets_module_1 = require("../wallets/wallets.module");
const transactions_module_1 = require("../transactions/transactions.module");
const leads_module_1 = require("../leads/leads.module");
const auth_module_1 = require("../auth/auth.module");
let HomepageModule = class HomepageModule {
};
exports.HomepageModule = HomepageModule;
exports.HomepageModule = HomepageModule = __decorate([
    (0, common_1.Module)({
        controllers: [homepage_controller_1.HomepageController],
        providers: [homepage_service_1.HomepageService],
        imports: [caching_config_1.CachingModule, city_module_1.CityModule, school_module_1.SchoolModule, slug_module_1.SlugModule, school_types_module_1.SchoolTypesModule, school_classification_module_1.SchoolClassificationModule, wallets_module_1.WalletsModule, transactions_module_1.TransactionsModule, leads_module_1.LeadsModule, auth_module_1.AuthModule]
    })
], HomepageModule);
//# sourceMappingURL=homepage.module.js.map