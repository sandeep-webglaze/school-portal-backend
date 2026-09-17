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
