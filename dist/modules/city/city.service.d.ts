import { Connection } from 'mongoose';
import { UploadService } from '../upload/upload.service';
import { SlugService } from '../slug/slug.service';
import { CreateCityDto } from './dto/create-city.dto';
import { CityRepository } from './city.repository';
import { CityFilterDto } from './dto/city-filter.dto';
import { UpdateCityDto } from './dto/update-city.dto';
export declare class CityService {
    private readonly connection;
    readonly repository: CityRepository;
    readonly slugService: SlugService;
    readonly uploadService: UploadService;
    constructor(connection: Connection, repository: CityRepository, slugService: SlugService, uploadService: UploadService);
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
