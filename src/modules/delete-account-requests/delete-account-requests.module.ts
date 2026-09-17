import { Module } from '@nestjs/common';
import { DeleteAccountRequestsService } from './delete-account-requests.service';
import { DeleteAccountRequestsController } from './delete-account-requests.controller';
import { DeleteAccountRequestRepository } from './delete-account-request.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { DeleteAccountRequestModel } from './entities/delete-account-request.entity';

@Module({
  imports: [MongooseModule.forFeature([DeleteAccountRequestModel]),],
  controllers: [DeleteAccountRequestsController],
  providers: [DeleteAccountRequestRepository, DeleteAccountRequestsService],
  exports: [DeleteAccountRequestsService]
})
export class DeleteAccountRequestsModule { }
