/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { SchoolTypeRepository } from './school-type.repository';
import { CreateSchoolTypeDto } from './dto/create-school-type.dto';
import { UpdateSchoolTypeDto } from './dto/update-school-type.dto';
import { SchoolTypeFilterDto } from './dto/filter-school-type.dto';
export declare class SchoolTypeService {
    repository: SchoolTypeRepository;
    constructor(repository: SchoolTypeRepository);
    create(createDto: CreateSchoolTypeDto): Promise<import("../../lib/repository").CreatedModel<import("./interface").ISchoolTypeDocument>>;
    findAll(filterDto: SchoolTypeFilterDto): Promise<{
        data: import("./interface").ISchoolTypeDocument[];
        totalCount: number;
    }>;
    findOne(id: string): Promise<import("./interface").ISchoolTypeDocument>;
    update(id: string, updateDto: UpdateSchoolTypeDto): Promise<import("../../lib/repository").UpdatedModel>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("./interface").ISchoolTypeDocument> & import("./interface").ISchoolType & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
