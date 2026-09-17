import { Request } from "express";
import { RazorPayService } from "@/src/lib/shared";
import { IUserObj } from "../user/interface";
import { TransactionsService } from './transactions.service';
import { TransactionFilter } from "./dto/filter-transaction.dto";
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { CreditWalletDto, LeadsTransactions } from "./dto/create-transaction.dto";
export declare class TransactionsController {
    private readonly transactionsService;
    private readonly razorpayService;
    constructor(transactionsService: TransactionsService, razorpayService: RazorPayService);
    creditWallet(user: IUserObj, body: CreditWalletDto): Promise<import("./interface").ITransaction>;
    create(req: Request): Promise<any>;
    purchaseLeads(user: IUserObj, purchaseLeadDto: LeadsTransactions): Promise<import("./interface").ITransaction>;
    findAll(user: IUserObj, filterDto: TransactionFilter): Promise<{
        data: import("./interface").ITransactionDocument[];
        totalCount: number;
    }>;
    findOne(id: string): Promise<import("./interface").ITransactionDocument>;
    update(id: string, updateTransactionDto: UpdateTransactionDto): Promise<import("../../lib/repository").UpdatedModel>;
    remove(id: string): string;
}
