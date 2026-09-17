"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAccountRequestsModule = void 0;
const common_1 = require("@nestjs/common");
const delete_account_requests_service_1 = require("./delete-account-requests.service");
const delete_account_requests_controller_1 = require("./delete-account-requests.controller");
const delete_account_request_repository_1 = require("./delete-account-request.repository");
const mongoose_1 = require("@nestjs/mongoose");
const delete_account_request_entity_1 = require("./entities/delete-account-request.entity");
let DeleteAccountRequestsModule = class DeleteAccountRequestsModule {
};
exports.DeleteAccountRequestsModule = DeleteAccountRequestsModule;
exports.DeleteAccountRequestsModule = DeleteAccountRequestsModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([delete_account_request_entity_1.DeleteAccountRequestModel]),],
        controllers: [delete_account_requests_controller_1.DeleteAccountRequestsController],
        providers: [delete_account_request_repository_1.DeleteAccountRequestRepository, delete_account_requests_service_1.DeleteAccountRequestsService],
        exports: [delete_account_requests_service_1.DeleteAccountRequestsService]
    })
], DeleteAccountRequestsModule);
//# sourceMappingURL=delete-account-requests.module.js.map