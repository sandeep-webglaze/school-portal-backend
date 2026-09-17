import { IUserObj } from '../user/interface';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { WalletsService } from './wallets.service';
import { FilterWalletDto } from './dto/filter-wallet.dto';
export declare class WalletsController {
    private readonly walletsService;
    constructor(walletsService: WalletsService);
    create(createWalletDto: CreateWalletDto): Promise<import("../../lib/repository").CreatedModel<import("./interface").IWalletDocument>>;
    findAll(filterDto: FilterWalletDto): Promise<{
        data: import("./interface").IWalletDocument[];
        totalCount: number;
    }>;
    myWallet(user: IUserObj): Promise<import("mongoose").Document<unknown, {}, import("./interface").IWalletDocument> & import("./interface").IWallet & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(userId: string, updateWalletDto: UpdateWalletDto): Promise<import("../../lib/repository").UpdatedModel>;
    delete(userId: string): Promise<import("../../lib/repository").RemovedModel>;
}
