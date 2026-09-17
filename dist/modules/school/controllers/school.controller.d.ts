import { IUserObj } from '../../user/interface';
import { AuthService } from '../../auth/auth.service';
import { CreateSchoolDto, UpdateFeaturedSchoolsPriorityDto, UpdateSchoolDto } from '../dto/school.dto';
import { SchoolService } from '../services/school.service';
import { SchoolFilterDto } from '../dto/school-filter.dto';
import { SchoolChangesDto } from '../dto/school-request.dto';
export declare class SchoolController {
    private readonly schoolService;
    private readonly authService;
    constructor(schoolService: SchoolService, authService: AuthService);
    create(createSchoolDto: CreateSchoolDto): Promise<import("../../../lib/repository").CreatedModel<import("../interface").ISchoolDocument>>;
    findAll(filterDto: SchoolFilterDto): Promise<{
        schools: import("../interface").ISchoolDocument[];
        slugData: any;
        totalCount: number;
    }>;
    findAll2(filterDto: SchoolFilterDto, authHeader: any): Promise<{
        schools: import("../interface").ISchoolDocument[];
        slugData: any;
        totalCount: number;
    }>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("../interface").ISchoolDocument> & import("../interface").ISchool & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findOneBySlug(slug: string): Promise<import("mongoose").Document<unknown, {}, import("../interface").ISchoolDocument> & import("../interface").ISchool & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateSchool(user: IUserObj, updateSchoolDto: SchoolChangesDto): Promise<import("../../../lib/repository").UpdatedModel>;
    update(user: IUserObj, id: string, updateSchoolDto: UpdateSchoolDto): Promise<import("../../../lib/repository").UpdatedModel>;
    updateSchoolPriorities(updateSchoolPriorityDto: UpdateFeaturedSchoolsPriorityDto): Promise<import("mongodb").BulkWriteResult>;
    sendDetailsToMail(user: IUserObj, id: string): Promise<{
        success: boolean;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("../interface").ISchoolDocument> & import("../interface").ISchool & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
