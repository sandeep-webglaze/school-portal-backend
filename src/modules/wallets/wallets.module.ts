import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import { WalletRepository } from './wallet.repository';
import { WalletModel } from './entities/wallet.entity';

@Module({
  imports: [MongooseModule.forFeature([WalletModel])],
  controllers: [WalletsController],
  providers: [WalletRepository, WalletsService],
  exports: [WalletsService]
})
export class WalletsModule { }
