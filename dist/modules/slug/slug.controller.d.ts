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
