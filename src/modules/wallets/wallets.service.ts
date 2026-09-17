import { QueryOptions } from 'mongoose';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { WALLET_PAYMENT_TYPE } from '@/src/lib/constants';
import { createPaginatedMongoOptions } from '@/src/lib/utils';
import { IWalletDocument } from './interface';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { WalletRepository } from './wallet.repository';
import { FilterWalletDto } from './dto/filter-wallet.dto';

@Injectable()
export class WalletsService {
  constructor(
    readonly repository: WalletRepository
  ) { }

  create(createWalletDto: CreateWalletDto) {
    createWalletDto.lastPaymentAt = createWalletDto.lastPaymentAt ?? new Date();
    return this.repository.create(createWalletDto);
  }

  findAll(filterDto: FilterWalletDto) {
    const { limit, skip, ...filter } = createPaginatedMongoOptions(filterDto);
    return this.repository.findAll({
      filter: {
        user: filter.user,
        amount: (filter.minAmount || filter.maxAmount) && {
          $gte: filter.minAmount,
          $lte: filter.maxAmount,
        }
      },
      options: {
        skip,
        limit,
        populate: [
          {
            path: "user",
            options: { projection: "name mail" }
          }
        ]
      }
    });
  }

  myWallet(user: string) {
    return this.repository.findOne({ user });
  }

  // update wallet or create new if not exists
  async creditWallet(user: string, amount: number, options?: QueryOptions) {
    return this.repository.updateOne({ user }, { $inc: { amount }, lastPaymentAt: new Date() }, { ...options, upsert: true });
  }

  async debitWallet(user: string, debitAmount: number, options?: QueryOptions) {
    const userWallet = await this.repository.findOne({ user });
    if (!userWallet) throw new BadRequestException("insufficient balance");
    if (debitAmount > userWallet.amount) throw new BadRequestException("insufficient balance");
    return this.repository.updateOne({ user }, { $inc: { amount: -debitAmount }, lastPaymentAt: new Date() }, options);
  }

  async updateUserWallet(user: string, { amount, type, lastPaymentAt }: UpdateWalletDto) {
    const userWallet = await this.repository.findOne({ user });
    if (!userWallet) throw new NotFoundException("User wallet not found");
    switch (type) {
      case WALLET_PAYMENT_TYPE.DEBIT:
        if (amount > userWallet.amount) throw new BadRequestException("Invalid debit amount");
        amount = -amount;
        break;
      default:
        break;
    }
    return this.repository.updateOne({ user }, { $inc: { amount }, lastPaymentAt })
  }

  deleteUserWallet(user: string, options?: QueryOptions<IWalletDocument>) {
    return this.repository.delete({ user }, options);
  }
}
