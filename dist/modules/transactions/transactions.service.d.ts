/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Connection } from 'mongoose';
import { RazorPayService } from '@/src/lib/shared';
import { TRANSACTION_STATUS } from '@/src/lib/constants';
import { IUserObj } from '../user/interface';
import { LeadsService } from '../leads/leads.service';
import { WalletsService } from '../wallets/wallets.service';
import { ITransaction, ITransactionDocument } from './interface';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionRepository } from './transactions.repository';
import { LeadsTransactions } from './dto/create-transaction.dto';
import { TransactionFilter } from './dto/filter-transaction.dto';
export declare class TransactionsService {
    private readonly connection;
    readonly repository: TransactionRepository;
    private readonly razorpayService;
    private readonly leadsService;
    private readonly walletService;
    constructor(connection: Connection, repository: TransactionRepository, razorpayService: RazorPayService, leadsService: LeadsService, walletService: WalletsService);
    private generateTransactionID;
    private updateWalletCreditTransaction;
    creditWalletTransaction(user: IUserObj, amount: number): Promise<ITransaction>;
    findAll(filterDto: TransactionFilter): Promise<{
        data: ITransactionDocument[];
        totalCount: number;
    }>;
    findOne(id: string): Promise<ITransactionDocument>;
    updateVerifiedTransaction(orderId: string, status: TRANSACTION_STATUS, amount?: number, description?: string): Promise<any>;
    purchaseLeads(user: IUserObj, leadsDto: LeadsTransactions): Promise<ITransaction>;
    update(id: string, updateTransactionDto: UpdateTransactionDto): Promise<import("../../lib/repository").UpdatedModel>;
    remove(id: string): string;
}
