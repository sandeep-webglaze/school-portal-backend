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
import { QueryOptions } from 'mongoose';
import { IWalletDocument } from './interface';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { WalletRepository } from './wallet.repository';
import { FilterWalletDto } from './dto/filter-wallet.dto';
export declare class WalletsService {
    readonly repository: WalletRepository;
    constructor(repository: WalletRepository);
    create(createWalletDto: CreateWalletDto): Promise<import("../../lib/repository").CreatedModel<IWalletDocument>>;
    findAll(filterDto: FilterWalletDto): Promise<{
        data: IWalletDocument[];
        totalCount: number;
    }>;
    myWallet(user: string): Promise<import("mongoose").Document<unknown, {}, IWalletDocument> & import("./interface").IWallet & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    creditWallet(user: string, amount: number, options?: QueryOptions): Promise<import("../../lib/repository").UpdatedModel>;
    debitWallet(user: string, debitAmount: number, options?: QueryOptions): Promise<import("../../lib/repository").UpdatedModel>;
    updateUserWallet(user: string, { amount, type, lastPaymentAt }: UpdateWalletDto): Promise<import("../../lib/repository").UpdatedModel>;
    deleteUserWallet(user: string, options?: QueryOptions<IWalletDocument>): Promise<import("../../lib/repository").RemovedModel>;
}
