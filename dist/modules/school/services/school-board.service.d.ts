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
/// <reference types="mongoose/types/inferschematype" />
import { Connection } from 'mongoose';
import { CreateSchoolBoardDto, SchoolBoardFilterDto, UpdateSchoolBoardDto } from '../dto/school-board.dto';
import { SchoolBoardRepository } from '../repositories/school-board.repository';
export declare class SchoolBoardService {
    private readonly connection;
    repository: SchoolBoardRepository;
    constructor(connection: Connection, repository: SchoolBoardRepository);
    create(createSchoolBoardDto: CreateSchoolBoardDto): Promise<import("../../../lib/repository").CreatedModel<import("../interface").ISchoolBoardDocument>>;
    findAll(filterDto: SchoolBoardFilterDto): Promise<{
        data: import("../interface").ISchoolBoardDocument[];
        totalCount: number;
    }>;
    findOne(id: string): Promise<import("../interface").ISchoolBoardDocument>;
    update(id: string, updateSchoolBoardDto: UpdateSchoolBoardDto): Promise<import("../../../lib/repository").UpdatedModel>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("../interface").ISchoolBoardDocument> & import("../interface").ISchoolBoard & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
