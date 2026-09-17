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
exports.DeleteAccountRequestsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../lib/constants");
const create_delete_account_request_dto_1 = require("./dto/create-delete-account-request.dto");
const delete_account_requests_service_1 = require("./delete-account-requests.service");
const roles_guard_1 = require("../auth/guards/roles.guard");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
let DeleteAccountRequestsController = class DeleteAccountRequestsController {
    constructor(deleteAccountRequestsService) {
        this.deleteAccountRequestsService = deleteAccountRequestsService;
    }
    create(user, createDeleteAccountRequestDto) {
        return this.deleteAccountRequestsService.create(user, createDeleteAccountRequestDto);
    }
    findAll() {
        return this.deleteAccountRequestsService.findAll();
    }
    remove(id) {
        return this.deleteAccountRequestsService.remove(id);
    }
};
exports.DeleteAccountRequestsController = DeleteAccountRequestsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.SCHOOL_ADMIN, constants_1.USER_ROLE.USER),
    (0, swagger_1.ApiBody)({ type: create_delete_account_request_dto_1.CreateDeleteAccountRequestDto, description: "Json schema for creating delete account request" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "Delete account request added successfully" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, jwt_guard_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_delete_account_request_dto_1.CreateDeleteAccountRequestDto]),
    __metadata("design:returntype", void 0)
], DeleteAccountRequestsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN, constants_1.USER_ROLE.SUB_ADMIN),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of all delete account requests.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DeleteAccountRequestsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN),
    (0, swagger_1.ApiParam)({ type: String, name: "id", description: "User id" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'request removed successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DeleteAccountRequestsController.prototype, "remove", null);
exports.DeleteAccountRequestsController = DeleteAccountRequestsController = __decorate([
    (0, swagger_1.ApiTags)('Delete Account Requests'),
    (0, common_1.Controller)('delete-account-requests'),
    __metadata("design:paramtypes", [delete_account_requests_service_1.DeleteAccountRequestsService])
], DeleteAccountRequestsController);
//# sourceMappingURL=delete-account-requests.controller.js.map