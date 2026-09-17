import { IUserObj } from '../../user/interface';
import { SchoolRequestService } from '../services/school-request.service';
import { CreateSchoolRequestDto, SchoolRequestFilterDto, UpdateSchoolRequestDto } from '../dto/school-request.dto';
export declare class SchoolRequestController {
    private readonly schoolRequestService;
    constructor(schoolRequestService: SchoolRequestService);
    create(user: IUserObj, body: CreateSchoolRequestDto): Promise<import("../../../lib/repository").CreatedModel<import("../interface").ISchoolRequestDocument>>;
    findAll(user: IUserObj, filter: SchoolRequestFilterDto): Promise<{
        data: import("../interface").ISchoolRequestDocument[];
        totalCount: number;
    }>;
    findOne(id: string): Promise<import("../interface").ISchoolRequestDocument>;
    update(id: string, updateSchoolDto: UpdateSchoolRequestDto): Promise<import("../../../lib/repository").UpdatedModel>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("../interface").ISchoolRequestDocument> & import("../interface").ISchoolRequest & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
