import { IUserObj } from '../user/interface';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { LeadFilterDto } from './dto/filter-lead.dto';
export declare class LeadsController {
    private readonly leadsService;
    constructor(leadsService: LeadsService);
    create(createLeadDto: CreateLeadDto): Promise<import("../../lib/repository").CreatedModel<import("./interface").ILeadDocument>>;
    findAll(user: IUserObj, filter: LeadFilterDto): Promise<{
        data: import("./interface").ILeadDocument[];
        totalCount: number;
    }>;
    availableLeads(user: IUserObj, filter: LeadFilterDto): Promise<{
        data: import("./interface").ILeadDocument[];
        totalCount: number;
    }>;
    myLeads(user: IUserObj, filter: LeadFilterDto): Promise<{
        data: import("./interface").ILeadDocument[];
        totalCount: number;
    }>;
    update(id: string, updateLeadDto: UpdateLeadDto): Promise<import("../../lib/repository").UpdatedModel>;
    remove(id: string): Promise<import("../../lib/repository").RemovedModel>;
}
