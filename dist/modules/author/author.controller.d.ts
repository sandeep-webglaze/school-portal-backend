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
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { AuthorFilterDto } from './dto/filter-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
export declare class AuthorController {
    private readonly authorService;
    constructor(authorService: AuthorService);
    create(createAuthorDto: CreateAuthorDto): Promise<import("../../lib/repository").CreatedModel<import("./interface").IAuthorDocument>>;
    findAll(filterDto: AuthorFilterDto): Promise<{
        data: import("./interface").IAuthorDocument[];
        totalCount: number;
    }>;
    authorDetail(slug: string): Promise<{
        author: import("mongoose").Document<unknown, {}, import("./interface").IAuthorDocument> & import("./interface").IAuthor & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
        articles: import("../slug/interface").ISlugDocument[];
        totalArticles: number;
    }>;
    findPublishedPages(id: string): Promise<{
        pages: {
            _id: any;
            slug: any;
            formattedText: any;
            heroTitle: any;
            slugType: any;
            attribution: string;
        }[];
        totalPages: number;
    }>;
    findOne(id: string): Promise<import("./interface").IAuthorDocument>;
    updateOne(id: string, updateDto: UpdateAuthorDto): Promise<import("../../lib/repository").UpdatedModel>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("./interface").IAuthorDocument> & import("./interface").IAuthor & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
