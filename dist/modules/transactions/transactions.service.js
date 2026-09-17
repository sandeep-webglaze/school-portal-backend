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
exports.TransactionsService = void 0;
const uuid_1 = require("uuid");
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const shared_1 = require("../../lib/shared");
const constants_1 = require("../../lib/constants");
const utils_1 = require("../../lib/utils");
const leads_service_1 = require("../leads/leads.service");
const wallets_service_1 = require("../wallets/wallets.service");
const transactions_repository_1 = require("./transactions.repository");
let TransactionsService = class TransactionsService {
    constructor(connection, repository, razorpayService, leadsService, walletService) {
        this.connection = connection;
        this.repository = repository;
        this.razorpayService = razorpayService;
        this.leadsService = leadsService;
        this.walletService = walletService;
    }
    generateTransactionID() {
        return (0, uuid_1.v4)();
    }
    async updateWalletCreditTransaction(transaction, paymentStatus, amount, description) {
        const transactionSession = await this.connection.startSession();
        transactionSession.startTransaction();
        console.log('in update Wallet', transaction, paymentStatus, amount);
        try {
            await this.repository.updateOne({ orderId: transaction.orderId }, { status: paymentStatus, description, amount }, { session: transactionSession });
            if (paymentStatus === constants_1.TRANSACTION_STATUS.SUCCESS) {
                await this.walletService.creditWallet(transaction.user.toString(), amount, { session: transactionSession });
            }
            await transactionSession.commitTransaction();
        }
        catch (error) {
            console.log("error in up=>", error);
            await transactionSession.abortTransaction();
            throw error;
        }
        finally {
            await transactionSession.endSession();
        }
    }
    async creditWalletTransaction(user, amount) {
        const razorpayOrder = await this.razorpayService.createOrder(amount);
        if (!razorpayOrder.id)
            throw new common_1.HttpException('Unable to create order', common_1.HttpStatus.FAILED_DEPENDENCY);
        const transaction = {
            transactionId: this.generateTransactionID(),
            paymentMethod: 'razorpay',
            amount: amount,
            user: user._id,
            type: constants_1.TRANSACTION_TYPE.CREDIT,
            status: constants_1.TRANSACTION_STATUS.PENDING,
            timestamp: new Date(),
            orderId: razorpayOrder.id,
            description: ``,
        };
        await this.repository.updateOne({ status: constants_1.TRANSACTION_STATUS.PENDING, user: transaction.user, amount: transaction.amount }, transaction, { upsert: true });
        return transaction;
    }
    findAll(filterDto) {
        const { skip, limit, ...filter } = (0, utils_1.createPaginatedMongoOptions)(filterDto);
        return this.repository.findAll({
            filter: {
                transactionId: filter.transactionId,
                user: filter.user,
                type: filter.type,
                status: filter.status ?? { $ne: constants_1.TRANSACTION_STATUS.PENDING },
                orderId: filter.orderId,
                paymentMethod: filter.paymentMethod && { $regex: `^${filter.paymentMethod}`, $options: 'i' },
                timestamp: (filter.from || filter.to) && {
                    $gte: filter.from,
                    $lte: filter.to,
                }
            },
            options: {
                skip,
                limit,
                sort: { timestamp: -1 }
            }
        });
    }
    findOne(id) {
        return this.repository.findById(id, {
            options: {
                populate: [
                    {
                        path: 'leads.lead'
                    }
                ]
            }
        });
    }
    async updateVerifiedTransaction(orderId, status, amount, description) {
        const transaction = await this.repository.findOne({ orderId });
        console.log('transaction ==>', JSON.stringify(transaction, null, 2));
        if (!transaction)
            return;
        if (transaction.status !== constants_1.TRANSACTION_STATUS.PENDING)
            return;
        try {
            return await (0, utils_1.retryWrapper)(() => this.updateWalletCreditTransaction(transaction, status, amount, description));
        }
        catch (error) {
            console.log('Failed to update wallet transaction=>', error);
            throw new common_1.HttpException(`Failed to update wallet transaction-${transaction.transactionId}`, 500);
        }
    }
    async purchaseLeads(user, leadsDto) {
        const transactionSession = await this.connection.startSession();
        transactionSession.startTransaction();
        try {
            const leads = await this.leadsService.repository.findAll({ filter: { _id: leadsDto.leads, owner: { $exists: false } }, options: { session: transactionSession } });
            if (leads.totalCount !== leadsDto.leads.length)
                throw new common_1.ConflictException("Leads already owned by someone else");
            const { totalAmount, purchaseLeads } = leads.data.reduce((prev, curr) => {
                prev.totalAmount += curr.currentPrice;
                prev.purchaseLeads.push({ price: curr.currentPrice, lead: curr._id });
                return prev;
            }, { totalAmount: 0, purchaseLeads: [] });
            await this.leadsService.repository.updateMany({ _id: leadsDto.leads }, { owner: user._id }, { session: transactionSession });
            await this.walletService.debitWallet(user._id, totalAmount, { session: transactionSession });
            const transaction = {
                transactionId: this.generateTransactionID(),
                paymentMethod: 'wallet',
                amount: totalAmount,
                user: user._id,
                type: constants_1.TRANSACTION_TYPE.PURCHASE,
                status: constants_1.TRANSACTION_STATUS.SUCCESS,
                timestamp: new Date(),
                description: `${leads.totalCount} leads purchased successfully`,
                leads: purchaseLeads
            };
            await this.repository.create(transaction, { session: transactionSession });
            await transactionSession.commitTransaction();
            return transaction;
        }
        catch (error) {
            await transactionSession.abortTransaction();
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException(`Failed to purchased Leads, Please retry`, 500);
        }
        finally {
            await transactionSession.endSession();
        }
    }
    update(id, updateTransactionDto) {
        return this.repository.updateById(id, updateTransactionDto);
    }
    remove(id) {
        return `This action removes a #${id} transaction`;
    }
};
exports.TransactionsService = TransactionsService;
exports.TransactionsService = TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectConnection)()),
    __metadata("design:paramtypes", [mongoose_1.Connection,
        transactions_repository_1.TransactionRepository,
        shared_1.RazorPayService,
        leads_service_1.LeadsService,
        wallets_service_1.WalletsService])
], TransactionsService);
//# sourceMappingURL=transactions.service.js.map