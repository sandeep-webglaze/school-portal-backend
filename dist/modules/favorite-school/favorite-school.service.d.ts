import { IUserObj } from '../user/interface';
import { SchoolService } from '../school/services/school.service';
import { FavoriteSchoolRepository } from './favorite-school.repository';
import { FilterFavoriteSchoolDto } from './dto/filter-favorite-school.dto';
export declare class FavoriteSchoolService {
    readonly repository: FavoriteSchoolRepository;
    readonly schoolService: SchoolService;
    constructor(repository: FavoriteSchoolRepository, schoolService: SchoolService);
    create(user: string, school: string): Promise<import("../../lib/repository").CreatedModel<import("./interface").IFavoriteSchoolDocument>>;
    myFavoriteSchools(user: IUserObj, filterDto: FilterFavoriteSchoolDto): Promise<{
        schools: import("../school/interface").ISchoolDocument[];
        slugData: any;
        totalCount: number;
    } | {
        schools: any[];
        totalCount: number;
    }>;
    remove(user: IUserObj, school: string): Promise<import("../../lib/repository").RemovedModel>;
}
