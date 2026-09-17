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
exports.WalletsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../lib/constants");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const create_wallet_dto_1 = require("./dto/create-wallet.dto");
const update_wallet_dto_1 = require("./dto/update-wallet.dto");
const wallets_service_1 = require("./wallets.service");
const filter_wallet_dto_1 = require("./dto/filter-wallet.dto");
let WalletsController = class WalletsController {
    constructor(walletsService) {
        this.walletsService = walletsService;
    }
    create(createWalletDto) {
        return this.walletsService.create(createWalletDto);
    }
    findAll(filterDto) {
        return this.walletsService.findAll(filterDto);
    }
    myWallet(user) {
        return this.walletsService.myWallet(user._id);
    }
    update(userId, updateWalletDto) {
        return this.walletsService.updateUserWallet(userId, updateWalletDto);
    }
    delete(userId) {
        return this.walletsService.deleteUserWallet(userId);
    }
};
exports.WalletsController = WalletsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN),
    (0, swagger_1.ApiBody)({ type: create_wallet_dto_1.CreateWalletDto, description: 'Json schema for creating new wallet for user' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Wallet created successfully', }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_wallet_dto_1.CreateWalletDto]),
    __metadata("design:returntype", void 0)
], WalletsController.prototype, "create", null);
__decorate([
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN),
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'All Wallets List based on applied filters.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_wallet_dto_1.FilterWalletDto]),
    __metadata("design:returntype", void 0)
], WalletsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('my-wallet'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Get logged in user wallet.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, jwt_guard_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WalletsController.prototype, "myWallet", null);
__decorate([
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN),
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiParam)({ type: String, name: 'id', description: 'user id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Wallet updated.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_wallet_dto_1.UpdateWalletDto]),
    __metadata("design:returntype", void 0)
], WalletsController.prototype, "update", null);
__decorate([
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiParam)({ type: String, name: 'id', description: 'Wallet id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Wallet removed successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WalletsController.prototype, "delete", null);
exports.WalletsController = WalletsController = __decorate([
    (0, swagger_1.ApiTags)('Wallets'),
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, common_1.Controller)('wallets'),
    __metadata("design:paramtypes", [wallets_service_1.WalletsService])
], WalletsController);
//# sourceMappingURL=wallets.controller.js.map