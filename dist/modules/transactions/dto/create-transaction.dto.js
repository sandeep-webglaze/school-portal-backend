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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditWalletDto = exports.LeadsTransactions = exports.CreateTransactionDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../../lib/constants");
const mongoose_1 = require("mongoose");
class CreateTransactionDto {
}
exports.CreateTransactionDto = CreateTransactionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, example: "razorpay", description: "Method by which payment has done" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTransactionDto.prototype, "paymentMethod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: Number, minimum: 1, description: "Amount credit/debit from wallet" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateTransactionDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", Object)
], CreateTransactionDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, enum: constants_1.TRANSACTION_TYPE, description: "type of transaction" }),
    (0, class_validator_1.IsEnum)(constants_1.TRANSACTION_TYPE),
    __metadata("design:type", String)
], CreateTransactionDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, example: new Date(), default: new Date(), description: "exact timestamp when transaction is done" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], CreateTransactionDto.prototype, "timestamp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: "unique razorpay order id" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTransactionDto.prototype, "orderId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: "any note or description about payment" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTransactionDto.prototype, "description", void 0);
class LeadsTransactions {
}
exports.LeadsTransactions = LeadsTransactions;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, isArray: true, example: [new mongoose_1.Types.ObjectId()], description: "Unique list of leads which User wants to buy" }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayUnique)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.IsMongoId)({ each: true }),
    __metadata("design:type", Array)
], LeadsTransactions.prototype, "leads", void 0);
class CreditWalletDto {
}
exports.CreditWalletDto = CreditWalletDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: Number, minimum: 1, description: "amount which has to be added to wallet" }),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100000),
    __metadata("design:type", Number)
], CreditWalletDto.prototype, "amount", void 0);
//# sourceMappingURL=create-transaction.dto.js.map