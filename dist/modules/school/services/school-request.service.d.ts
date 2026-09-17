import { Connection } from 'mongoose';
import { CreateSchoolRequestDto, SchoolRequestFilterDto, UpdateSchoolRequestDto } from '../dto/school-request.dto';
import { SchoolRequestRepository } from '../repositories/school-request.repository';
import { SchoolService } from './school.service';
export declare class SchoolRequestService {
    private readonly connection;
    readonly repository: SchoolRequestRepository;
    readonly schoolService: SchoolService;
    constructor(connection: Connection, repository: SchoolRequestRepository, schoolService: SchoolService);
    create(school: string, createDto: CreateSchoolRequestDto): Promise<import("../../../lib/repository").CreatedModel<import("../interface").ISchoolRequestDocument>>;
    findAll(filterDto: SchoolRequestFilterDto): Promise<{
        data: import("../interface").ISchoolRequestDocument[];
        totalCount: number;
    }>;
    findOne(id: string): Promise<import("../interface").ISchoolRequestDocument>;
    updateRequest(schoolId: string, updateDto: UpdateSchoolRequestDto): Promise<import("../../../lib/repository").UpdatedModel>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("../interface").ISchoolRequestDocument> & import("../interface").ISchoolRequest & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
