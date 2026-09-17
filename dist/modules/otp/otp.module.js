"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const services_1 = require("../../lib/shared/services");
const otp_repository_1 = require("./otp.repository");
const otp_service_1 = require("./otp.service");
const otp_entity_1 = require("./entities/otp.entity");
let OtpModule = class OtpModule {
};
exports.OtpModule = OtpModule;
exports.OtpModule = OtpModule = __decorate([
    (0, common_1.Module)({
        providers: [services_1.SMSService, otp_repository_1.OtpRepository, otp_service_1.OtpService],
        exports: [otp_service_1.OtpService],
        imports: [mongoose_1.MongooseModule.forFeature([otp_entity_1.OtpModel])]
    })
], OtpModule);
//# sourceMappingURL=otp.module.js.map