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
