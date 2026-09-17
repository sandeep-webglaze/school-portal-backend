import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';
import { CityFilterDto } from './dto/city-filter.dto';
import { UpdateCityDto } from './dto/update-city.dto';
export declare class CityController {
    private readonly cityService;
    constructor(cityService: CityService);
    create(createCityDto: CreateCityDto): Promise<import("../../lib/repository").CreatedModel<import("./interface").ICityDocument>>;
    findAll(filterDto: CityFilterDto): Promise<{
        data: import("./interface").ICityDocument[];
        totalCount: number;
    }>;
    findOne(id: string): Promise<import("./interface").ICityDocument>;
    updateOne(id: string, updateDto: UpdateCityDto): Promise<import("../../lib/repository").UpdatedModel>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("./interface").ICityDocument> & import("./interface").ICity & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
