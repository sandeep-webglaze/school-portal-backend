import { IUserObj } from '../user/interface';
import { CreateDeleteAccountRequestDto } from './dto/create-delete-account-request.dto';
import { DeleteAccountRequestRepository } from './delete-account-request.repository';
export declare class DeleteAccountRequestsService {
    private readonly repository;
    constructor(repository: DeleteAccountRequestRepository);
    create(user: IUserObj, createDeleteAccountRequestDto: CreateDeleteAccountRequestDto): Promise<import("../../lib/repository").CreatedModel<import("./interface").IDeleteAccountRequestDocument>>;
    findAll(): Promise<{
        data: import("./interface").IDeleteAccountRequestDocument[];
        totalCount: number;
    }>;
    remove(id: string): Promise<import("../../lib/repository").RemovedModel>;
}
