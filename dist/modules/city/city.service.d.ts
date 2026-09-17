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
