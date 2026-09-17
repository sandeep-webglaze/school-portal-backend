import { CreateDeleteAccountRequestDto } from './dto/create-delete-account-request.dto';
import { DeleteAccountRequestsService } from './delete-account-requests.service';
import { IUserObj } from '../user/interface';
export declare class DeleteAccountRequestsController {
    private readonly deleteAccountRequestsService;
    constructor(deleteAccountRequestsService: DeleteAccountRequestsService);
    create(user: IUserObj, createDeleteAccountRequestDto: CreateDeleteAccountRequestDto): Promise<import("../../lib/repository").CreatedModel<import("./interface").IDeleteAccountRequestDocument>>;
    findAll(): Promise<{
        data: import("./interface").IDeleteAccountRequestDocument[];
        totalCount: number;
    }>;
    remove(id: string): Promise<import("../../lib/repository").RemovedModel>;
}
