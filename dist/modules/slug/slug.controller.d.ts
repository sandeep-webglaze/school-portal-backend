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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { SlugService } from './slug.service';
import { CreateSlugDto } from './dto/create-slug.dto';
import { SlugFilterDto } from './dto/filter-slug.dto';
import { UpdateSlugDto } from './dto/update-slug.dto';
export declare class SlugController {
    private readonly slugService;
    constructor(slugService: SlugService);
    create(body: CreateSlugDto): Promise<import("../../lib/repository").CreatedModel<import("./interface").ISlugDocument>>;
    findAll(filterDto: SlugFilterDto): Promise<{
        data: import("./interface").ISlugDocument[];
        totalCount: number;
    }>;
    slugSearchSitemap(filterDto: SlugFilterDto): Promise<{
        data: import("./interface").ISlugDocument[];
        totalCount: number;
    }>;
    slugSchoolSitemap(filterDto: SlugFilterDto): Promise<{
        data: import("./interface").ISlugDocument[];
        totalCount: number;
    }>;
    slugData(id: string): Promise<any>;
    findOne(id: string): Promise<import("./interface").ISlugDocument>;
    update(id: string, body: UpdateSlugDto): Promise<import("../../lib/repository").UpdatedModel>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("./interface").ISlugDocument> & import("./interface").ISlug & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
