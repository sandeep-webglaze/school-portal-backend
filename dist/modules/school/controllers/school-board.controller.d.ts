import { CreateSchoolBoardDto, SchoolBoardFilterDto, UpdateSchoolBoardDto } from '../dto/school-board.dto';
import { SchoolBoardService } from '../services/school-board.service';
export declare class SchoolBoardController {
    private readonly schoolBoardService;
    constructor(schoolBoardService: SchoolBoardService);
    create(createSchoolBoardDto: CreateSchoolBoardDto): Promise<import("../../../lib/repository").CreatedModel<import("../interface").ISchoolBoardDocument>>;
    findAll(filter: SchoolBoardFilterDto): Promise<{
        data: import("../interface").ISchoolBoardDocument[];
        totalCount: number;
    }>;
    findOne(id: string): Promise<import("../interface").ISchoolBoardDocument>;
    update(id: string, updateSchoolBoardDto: UpdateSchoolBoardDto): Promise<import("../../../lib/repository").UpdatedModel>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("../interface").ISchoolBoardDocument> & import("../interface").ISchoolBoard & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
