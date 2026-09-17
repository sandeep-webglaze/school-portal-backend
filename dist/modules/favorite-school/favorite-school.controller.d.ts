import { IUserObj } from '../user/interface';
import { FavoriteSchoolService } from './favorite-school.service';
import { CreateFavoriteSchoolDto } from './dto/create-favorite-school.dto';
import { FilterFavoriteSchoolDto } from './dto/filter-favorite-school.dto';
export declare class FavoriteSchoolController {
    private readonly favoriteSchoolService;
    constructor(favoriteSchoolService: FavoriteSchoolService);
    create(createFavoriteSchoolDto: CreateFavoriteSchoolDto): Promise<import("../../lib/repository").CreatedModel<import("./interface").IFavoriteSchoolDocument>>;
    findAll(user: IUserObj, filterDto: FilterFavoriteSchoolDto): Promise<{
        schools: import("../school/interface").ISchoolDocument[];
        slugData: any;
        totalCount: number;
    } | {
        schools: any[];
        totalCount: number;
    }>;
    addToWishList(user: IUserObj, school: string): Promise<import("../../lib/repository").CreatedModel<import("./interface").IFavoriteSchoolDocument>>;
    removeFromWishList(user: IUserObj, school: string): Promise<import("../../lib/repository").RemovedModel>;
}
