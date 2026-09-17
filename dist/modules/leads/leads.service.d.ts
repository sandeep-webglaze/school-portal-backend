import { QueryOptions } from 'mongoose';
import { IUserObj } from '../user/interface';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { LeadRepository } from './leads.repository';
import { LeadFilterDto } from './dto/filter-lead.dto';
import { ILeadDocument } from './interface';
export declare class LeadsService {
    readonly repository: LeadRepository;
    ignoreObscureTexts: string[];
    constructor(repository: LeadRepository);
    private computeLeadPrice;
    private obscureText;
    private formatLead;
    createBulkLeads(data: CreateLeadDto[], options: QueryOptions): Promise<{
        objects: import("mongoose").MergeType<import("mongoose").Document<unknown, {}, ILeadDocument> & import("./interface").ILead & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, Omit<object[], "_id">>[];
        created: boolean;
    }>;
    create(createLeadDto: CreateLeadDto): Promise<import("../../lib/repository").CreatedModel<ILeadDocument>>;
    availableLeadsForPurchase(user: IUserObj, filterDto: LeadFilterDto): Promise<{
        data: ILeadDocument[];
        totalCount: number;
    }>;
    findAll(user: IUserObj, filterDto: LeadFilterDto): Promise<{
        data: ILeadDocument[];
        totalCount: number;
    }>;
    findOne(id: number): string;
    update(id: string, updateLeadDto: UpdateLeadDto): Promise<import("../../lib/repository").UpdatedModel>;
    remove(id: string | string[]): Promise<import("../../lib/repository").RemovedModel>;
}
