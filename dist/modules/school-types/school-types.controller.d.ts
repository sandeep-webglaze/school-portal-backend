import { SchoolTypeService } from './school-types.service';
import { CreateSchoolTypeDto } from './dto/create-school-type.dto';
import { UpdateSchoolTypeDto } from './dto/update-school-type.dto';
import { SchoolTypeFilterDto } from './dto/filter-school-type.dto';
export declare class SchoolTypeController {
    private readonly schoolTypeService;
    constructor(schoolTypeService: SchoolTypeService);
    create(createDto: CreateSchoolTypeDto): Promise<import("../../lib/repository").CreatedModel<import("./interface").ISchoolTypeDocument>>;
    findAll(filter: SchoolTypeFilterDto): Promise<{
        data: import("./interface").ISchoolTypeDocument[];
        totalCount: number;
    }>;
    findOne(id: string): Promise<import("./interface").ISchoolTypeDocument>;
    update(id: string, updateDto: UpdateSchoolTypeDto): Promise<import("../../lib/repository").UpdatedModel>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("./interface").ISchoolTypeDocument> & import("./interface").ISchoolType & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
