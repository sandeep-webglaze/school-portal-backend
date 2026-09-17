import { v4 as uuidV4 } from 'uuid';
import { Connection } from 'mongoose';
import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';

import { RazorPayService } from '@/src/lib/shared';
import { TRANSACTION_STATUS, TRANSACTION_TYPE } from '@/src/lib/constants';
import { createPaginatedMongoOptions, retryWrapper } from '@/src/lib/utils';
import { IUserObj } from '../user/interface';
import { LeadsService } from '../leads/leads.service';
import { WalletsService } from '../wallets/wallets.service';
import { IPurchasedLeads, ITransaction, ITransactionDocument } from './interface';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionRepository } from './transactions.repository';
import { LeadsTransactions } from './dto/create-transaction.dto';
import { TransactionFilter } from './dto/filter-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    readonly repository: TransactionRepository,
    private readonly razorpayService: RazorPayService,
    private readonly leadsService: LeadsService,
    private readonly walletService: WalletsService,
  ) { }

  private generateTransactionID() {
    return uuidV4();
  }

  private async updateWalletCreditTransaction(transaction: ITransactionDocument, paymentStatus: TRANSACTION_STATUS, amount?: number, description?: string) {
    const transactionSession = await this.connection.startSession();
    transactionSession.startTransaction();

    console.log('in update Wallet', transaction, paymentStatus, amount);

    try {
      await this.repository.updateOne({ orderId: transaction.orderId }, { status: paymentStatus, description, amount }, { session: transactionSession });

      // update user wallet if payment succeed
      if (paymentStatus === TRANSACTION_STATUS.SUCCESS) {
        await this.walletService.creditWallet(
          transaction.user.toString(),
          amount,
          { session: transactionSession }
        )
      }

      await transactionSession.commitTransaction();
    } catch (error) {
      console.log("error in up=>", error)
      await transactionSession.abortTransaction();
      throw error;
    } finally {
      await transactionSession.endSession();
    }
  }

  async creditWalletTransaction(user: IUserObj, amount: number) {
    // create order
    const razorpayOrder = await this.razorpayService.createOrder(amount);

    if (!razorpayOrder.id) throw new HttpException('Unable to create order', HttpStatus.FAILED_DEPENDENCY);

    const transaction: ITransaction = {
      transactionId: this.generateTransactionID(),
      paymentMethod: 'razorpay',
      amount: amount,
      user: user._id,
      type: TRANSACTION_TYPE.CREDIT,
      status: TRANSACTION_STATUS.PENDING,
      timestamp: new Date(),
      orderId: razorpayOrder.id,
      description: ``,
    }

    // update duplicate transactions or create if not exists
    await this.repository.updateOne(
      { status: TRANSACTION_STATUS.PENDING, user: transaction.user, amount: transaction.amount },
      transaction,
      { upsert: true }
    );
    return transaction;
  }

  findAll(filterDto: TransactionFilter) {
    const { skip, limit, ...filter } = createPaginatedMongoOptions(filterDto)
    return this.repository.findAll({
      filter: {
        transactionId: filter.transactionId,
        user: filter.user,
        type: filter.type,
        status: filter.status ?? { $ne: TRANSACTION_STATUS.PENDING },
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

  findOne(id: string) {
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

  async updateVerifiedTransaction(orderId: string, status: TRANSACTION_STATUS, amount?: number, description?: string) {
    const transaction = await this.repository.findOne({ orderId });
    console.log('transaction ==>', JSON.stringify(transaction, null, 2))
    if (!transaction) return;
    if (transaction.status !== TRANSACTION_STATUS.PENDING) return;

    try {
      return await retryWrapper(() => this.updateWalletCreditTransaction(transaction, status, amount, description));
    } catch (error) {
      console.log('Failed to update wallet transaction=>', error)
      throw new HttpException(`Failed to update wallet transaction-${transaction.transactionId}`, 500)
    }
  }

  async purchaseLeads(user: IUserObj, leadsDto: LeadsTransactions) {
    const transactionSession = await this.connection.startSession();
    transactionSession.startTransaction();
    try {
      // get non purchased leads
      const leads = await this.leadsService.repository.findAll({ filter: { _id: leadsDto.leads, owner: { $exists: false } }, options: { session: transactionSession } });

      // check if leads get are equal to user required leads
      if (leads.totalCount !== leadsDto.leads.length) throw new ConflictException("Leads already owned by someone else");

      const { totalAmount, purchaseLeads } = leads.data.reduce((prev, curr) => {
        prev.totalAmount += curr.currentPrice;
        prev.purchaseLeads.push({ price: curr.currentPrice, lead: curr._id } as IPurchasedLeads)
        return prev;
      }, { totalAmount: 0, purchaseLeads: [] });

      // update owner in leads
      await this.leadsService.repository.updateMany({ _id: leadsDto.leads }, { owner: user._id }, { session: transactionSession });

      // update user wallet
      await this.walletService.debitWallet(
        user._id,
        totalAmount,
        { session: transactionSession }
      )

      // create transaction
      const transaction: ITransaction = {
        transactionId: this.generateTransactionID(),
        paymentMethod: 'wallet',
        amount: totalAmount,
        user: user._id,
        type: TRANSACTION_TYPE.PURCHASE,
        status: TRANSACTION_STATUS.SUCCESS,
        timestamp: new Date(),
        description: `${leads.totalCount} leads purchased successfully`,
        leads: purchaseLeads
      }
      await this.repository.create(transaction, { session: transactionSession });
      await transactionSession.commitTransaction();
      return transaction;
    } catch (error) {
      await transactionSession.abortTransaction()
      if (error instanceof HttpException) throw error;
      throw new HttpException(`Failed to purchased Leads, Please retry`, 500)
    } finally {
      await transactionSession.endSession();
    }
  }

  update(id: string, updateTransactionDto: UpdateTransactionDto) {
    return this.repository.updateById(id, updateTransactionDto);
  }

  remove(id: string) {
    return `This action removes a #${id} transaction`;
  }
}
