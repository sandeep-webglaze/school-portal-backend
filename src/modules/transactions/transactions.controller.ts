import { Request } from "express";
import { Controller, Get, Post, Body, Put, Param, Delete, Req, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

import { RazorPayService } from "@/src/lib/shared";
import { ValidateMongoId } from "@/src/lib/decorators";
import { TRANSACTION_STATUS, USER_ROLE } from '@/src/lib/constants';
import { IUserObj } from "../user/interface";
import { AllowedRoles } from "../auth/guards/roles.guard";
import { CurrentUser, Public } from "../auth/guards/jwt.guard";
import { TransactionsService } from './transactions.service';
import { TransactionFilter } from "./dto/filter-transaction.dto";
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { CreditWalletDto, LeadsTransactions } from "./dto/create-transaction.dto";

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly razorpayService: RazorPayService,
  ) { }

  @ApiBearerAuth('JWT_Auth')
  @AllowedRoles(USER_ROLE.SCHOOL_ADMIN)
  @Post('credit-wallet')
  @ApiBody({ type: CreditWalletDto, description: 'Json schema for credit wallet' })
  @ApiResponse({ status: 201, description: 'Wallet transaction captured successfully', })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  creditWallet(@CurrentUser() user: IUserObj, @Body() body: CreditWalletDto) {
    return this.transactionsService.creditWalletTransaction(user, body.amount);
  }

  @Public()
  @Post('webhook/v2/razorpay')
  @ApiResponse({ status: 201, description: 'Transaction verified successfully', })
  @ApiResponse({ status: 403, description: 'Forbidden, Invalid Request signature.' })
  create(@Req() req: Request) {
    const requestMeta = this.razorpayService.validatePaymentRequest(req);
    if (!requestMeta) return;
    if (!requestMeta.orderId) return;

    const transactionStatus = (requestMeta.success) ? TRANSACTION_STATUS.SUCCESS : TRANSACTION_STATUS.FAILED
    return this.transactionsService.updateVerifiedTransaction(requestMeta.orderId, transactionStatus, requestMeta.amount);
  }

  @ApiBearerAuth('JWT_Auth')
  @AllowedRoles(USER_ROLE.SCHOOL_ADMIN)
  @Post('purchase-leads')
  @AllowedRoles(USER_ROLE.SCHOOL_ADMIN)
  purchaseLeads(@CurrentUser() user: IUserObj, @Body() purchaseLeadDto: LeadsTransactions) {
    return this.transactionsService.purchaseLeads(user, purchaseLeadDto)
  }

  @ApiBearerAuth('JWT_Auth')
  @AllowedRoles(USER_ROLE.ADMIN, USER_ROLE.SUB_ADMIN, USER_ROLE.SCHOOL_ADMIN)
  @Get()
  @ApiResponse({ status: 200, description: 'All Transactions based on applied filters.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  findAll(@CurrentUser() user: IUserObj, @Query() filterDto: TransactionFilter) {
    if (user.role === USER_ROLE.SCHOOL_ADMIN) filterDto.user = user._id;
    return this.transactionsService.findAll(filterDto);
  }

  @ApiBearerAuth('JWT_Auth')
  @Get(':id')
  @AllowedRoles(USER_ROLE.SCHOOL_ADMIN)
  @ApiParam({ type: String, name: 'id', description: 'Transaction id' })
  @ApiResponse({ status: 200, description: 'Transaction Detail.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  findOne(@Param('id', ValidateMongoId) id: string) {
    return this.transactionsService.findOne(id);
  }

  @ApiBearerAuth('JWT_Auth')
  @AllowedRoles(USER_ROLE.ADMIN)
  @Put(':id')
  @ApiParam({ type: String, name: 'id', description: 'Transaction id' })
  @ApiResponse({ status: 200, description: 'Transaction updated.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  update(@Param('id', ValidateMongoId) id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionsService.update(id, updateTransactionDto);
  }

  @ApiBearerAuth('JWT_Auth')
  @AllowedRoles(USER_ROLE.ADMIN)
  @Delete(':id')
  @ApiParam({ type: String, name: 'id', description: 'Transaction id' })
  @ApiResponse({ status: 200, description: 'Transaction removed successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(id);
  }
}
