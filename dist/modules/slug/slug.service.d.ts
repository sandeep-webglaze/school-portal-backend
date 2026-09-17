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
import { Connection, FilterQuery, Model, QueryOptions, SaveOptions } from 'mongoose';
import { IAuthorDocument } from '../author/interface';
import { PaginateParamDto } from '@/src/lib/shared/paginated_param.dto';
import { CityService } from '../city/city.service';
import { SchoolService } from '../school/services/school.service';
import { SchoolFilterDto } from '../school/dto/school-filter.dto';
import { AppConfigurationService } from '../app-configuration/app-configuration.service';
import { SlugRepository } from './slug.repository';
import { SlugFilterDto } from './dto/filter-slug.dto';
import { CreateSlugDto } from './dto/create-slug.dto';
import { UpdateSlugDto } from './dto/update-slug.dto';
import { ISlug, ISlugDocument } from './interface';
export declare class SlugService {
    private readonly connection;
    readonly repository: SlugRepository;
    readonly appConfigService: AppConfigurationService;
    readonly cityService: CityService;
    readonly schoolService: SchoolService;
    private readonly authorModel;
    constructor(connection: Connection, repository: SlugRepository, appConfigService: AppConfigurationService, cityService: CityService, schoolService: SchoolService, authorModel: Model<IAuthorDocument>);
    private attachAuthorFromContentLink;
    private updateSlugAssociatedEntity;
    private modifySlugMetadata;
    generateSlugFilters(filter: Omit<SlugFilterDto, 'limit' | 'page'>): FilterQuery<ISlug>;
    getFiltersFromSlug(slug?: string): Promise<{
        schoolFilters: SchoolFilterDto;
        slugData: any;
    }>;
    createIndividualSlug(createDto: CreateSlugDto, title: string, options: SaveOptions): Promise<import("../../lib/repository").CreatedModel<ISlugDocument>>;
    create(createDto: CreateSlugDto): Promise<import("../../lib/repository").CreatedModel<ISlugDocument>>;
    findAll(filterDto?: SlugFilterDto): Promise<{
        data: ISlugDocument[];
        totalCount: number;
    }>;
    slugSitemap(isSchool: boolean, filterDto?: PaginateParamDto): Promise<{
        data: ISlugDocument[];
        totalCount: number;
    }>;
    findBySlug(slug: string): Promise<any>;
    findOne(id: string): Promise<ISlugDocument>;
    updateOne(id: string, updateDto: UpdateSlugDto): Promise<import("../../lib/repository").UpdatedModel>;
    updateSlugBySlug(oldSlug: string, newSlug: string, options: QueryOptions): Promise<import("../../lib/repository").UpdatedModel>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, ISlugDocument> & ISlug & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
