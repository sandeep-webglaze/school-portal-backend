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
exports.TransactionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const shared_1 = require("../../lib/shared");
const decorators_1 = require("../../lib/decorators");
const constants_1 = require("../../lib/constants");
const roles_guard_1 = require("../auth/guards/roles.guard");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const transactions_service_1 = require("./transactions.service");
const filter_transaction_dto_1 = require("./dto/filter-transaction.dto");
const update_transaction_dto_1 = require("./dto/update-transaction.dto");
const create_transaction_dto_1 = require("./dto/create-transaction.dto");
let TransactionsController = class TransactionsController {
    constructor(transactionsService, razorpayService) {
        this.transactionsService = transactionsService;
        this.razorpayService = razorpayService;
    }
    creditWallet(user, body) {
        return this.transactionsService.creditWalletTransaction(user, body.amount);
    }
    create(req) {
        const requestMeta = this.razorpayService.validatePaymentRequest(req);
        if (!requestMeta)
            return;
        if (!requestMeta.orderId)
            return;
        const transactionStatus = (requestMeta.success) ? constants_1.TRANSACTION_STATUS.SUCCESS : constants_1.TRANSACTION_STATUS.FAILED;
        return this.transactionsService.updateVerifiedTransaction(requestMeta.orderId, transactionStatus, requestMeta.amount);
    }
    purchaseLeads(user, purchaseLeadDto) {
        return this.transactionsService.purchaseLeads(user, purchaseLeadDto);
    }
    findAll(user, filterDto) {
        if (user.role === constants_1.USER_ROLE.SCHOOL_ADMIN)
            filterDto.user = user._id;
        return this.transactionsService.findAll(filterDto);
    }
    findOne(id) {
        return this.transactionsService.findOne(id);
    }
    update(id, updateTransactionDto) {
        return this.transactionsService.update(id, updateTransactionDto);
    }
    remove(id) {
        return this.transactionsService.remove(id);
    }
};
exports.TransactionsController = TransactionsController;
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.SCHOOL_ADMIN),
    (0, common_1.Post)('credit-wallet'),
    (0, swagger_1.ApiBody)({ type: create_transaction_dto_1.CreditWalletDto, description: 'Json schema for credit wallet' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Wallet transaction captured successfully', }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, jwt_guard_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_transaction_dto_1.CreditWalletDto]),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "creditWallet", null);
__decorate([
    (0, jwt_guard_1.Public)(),
    (0, common_1.Post)('webhook/v2/razorpay'),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Transaction verified successfully', }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden, Invalid Request signature.' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.SCHOOL_ADMIN),
    (0, common_1.Post)('purchase-leads'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.SCHOOL_ADMIN),
    __param(0, (0, jwt_guard_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_transaction_dto_1.LeadsTransactions]),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "purchaseLeads", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN, constants_1.USER_ROLE.SUB_ADMIN, constants_1.USER_ROLE.SCHOOL_ADMIN),
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'All Transactions based on applied filters.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, jwt_guard_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, filter_transaction_dto_1.TransactionFilter]),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, common_1.Get)(':id'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.SCHOOL_ADMIN),
    (0, swagger_1.ApiParam)({ type: String, name: 'id', description: 'Transaction id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Transaction Detail.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.Param)('id', decorators_1.ValidateMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN),
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiParam)({ type: String, name: 'id', description: 'Transaction id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Transaction updated.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.Param)('id', decorators_1.ValidateMongoId)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_transaction_dto_1.UpdateTransactionDto]),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiParam)({ type: String, name: 'id', description: 'Transaction id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Transaction removed successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "remove", null);
exports.TransactionsController = TransactionsController = __decorate([
    (0, swagger_1.ApiTags)('Transactions'),
    (0, common_1.Controller)('transactions'),
    __metadata("design:paramtypes", [transactions_service_1.TransactionsService,
        shared_1.RazorPayService])
], TransactionsController);
//# sourceMappingURL=transactions.controller.js.map