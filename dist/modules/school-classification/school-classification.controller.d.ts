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
