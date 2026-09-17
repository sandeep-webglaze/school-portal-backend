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
import { SchoolClassificationService } from './school-classification.service';
import { CreateSchoolClassificationDto } from './dto/create-school-classification.dto';
import { UpdateSchoolClassificationDto } from './dto/update-school-classification.dto';
import { SchoolClassificationFilterDto } from './dto/school-classification-filter.dto';
export declare class SchoolClassificationController {
    private readonly schoolClassificationService;
    constructor(schoolClassificationService: SchoolClassificationService);
    create(createDto: CreateSchoolClassificationDto): Promise<import("../../lib/repository").CreatedModel<import("./interface").ISchoolClassificationDocument>>;
    findAll(filter: SchoolClassificationFilterDto): Promise<{
        data: import("./interface").ISchoolClassificationDocument[];
        totalCount: number;
    }>;
    findOne(id: string): Promise<import("./interface").ISchoolClassificationDocument>;
    update(id: string, updateDto: UpdateSchoolClassificationDto): Promise<import("../../lib/repository").UpdatedModel>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("./interface").ISchoolClassificationDocument> & import("./interface").ISchoolClassification & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
