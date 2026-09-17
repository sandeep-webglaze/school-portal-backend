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
exports.AppConfigurationRepository = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const mongoDb_repository_1 = require("../../lib/repository/mongoDb.repository");
const app_configuration_entity_1 = require("./entities/app-configuration.entity");
let AppConfigurationRepository = class AppConfigurationRepository extends mongoDb_repository_1.MongoRepository {
    constructor(entity) {
        super(entity);
        this.entity = entity;
    }
};
exports.AppConfigurationRepository = AppConfigurationRepository;
exports.AppConfigurationRepository = AppConfigurationRepository = __decorate([
    __param(0, (0, mongoose_2.InjectModel)(app_configuration_entity_1.AppConfigurationModel.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], AppConfigurationRepository);
//# sourceMappingURL=app-configuration.repository.js.map