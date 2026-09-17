import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RazorPayService } from '@/src/lib/shared';
import { LeadsModule } from '../leads/leads.module';
import { WalletsModule } from '../wallets/wallets.module';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TransactionRepository } from './transactions.repository';
import { TransactionModel } from './entities/transaction.entity';

@Module({
  imports: [MongooseModule.forFeature([TransactionModel]), LeadsModule, WalletsModule],
  controllers: [TransactionsController],
  providers: [RazorPayService, TransactionRepository, TransactionsService],
  exports: [TransactionsService]
})
export class TransactionsModule { }
