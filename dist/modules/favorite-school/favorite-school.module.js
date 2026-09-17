"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteSchoolModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const school_module_1 = require("../school/school.module");
const favorite_school_service_1 = require("./favorite-school.service");
const favorite_school_controller_1 = require("./favorite-school.controller");
const favorite_school_repository_1 = require("./favorite-school.repository");
const favorite_school_entity_1 = require("./entities/favorite-school.entity");
let FavoriteSchoolModule = class FavoriteSchoolModule {
};
exports.FavoriteSchoolModule = FavoriteSchoolModule;
exports.FavoriteSchoolModule = FavoriteSchoolModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([favorite_school_entity_1.FavoriteSchoolModel]), school_module_1.SchoolModule],
        controllers: [favorite_school_controller_1.FavoriteSchoolController],
        providers: [favorite_school_repository_1.FavoriteSchoolRepository, favorite_school_service_1.FavoriteSchoolService],
    })
], FavoriteSchoolModule);
//# sourceMappingURL=favorite-school.module.js.map