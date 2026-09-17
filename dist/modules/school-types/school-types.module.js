"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolTypesModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const caching_config_1 = require("../../config/caching.config");
const school_types_controller_1 = require("./school-types.controller");
const school_types_service_1 = require("./school-types.service");
const school_type_repository_1 = require("./school-type.repository");
const school_type_entity_1 = require("./entities/school-type.entity");
let SchoolTypesModule = class SchoolTypesModule {
};
exports.SchoolTypesModule = SchoolTypesModule;
exports.SchoolTypesModule = SchoolTypesModule = __decorate([
    (0, common_1.Module)({
        controllers: [school_types_controller_1.SchoolTypeController],
        providers: [school_type_repository_1.SchoolTypeRepository, school_types_service_1.SchoolTypeService],
        imports: [mongoose_1.MongooseModule.forFeature([school_type_entity_1.SchoolTypeModel]), caching_config_1.CachingModule],
        exports: [school_types_service_1.SchoolTypeService]
    })
], SchoolTypesModule);
//# sourceMappingURL=school-types.module.js.map