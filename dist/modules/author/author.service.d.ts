import { SlugService } from '../slug/slug.service';
import { AuthorRepository } from './author.repository';
import { CreateAuthorDto } from './dto/create-author.dto';
import { AuthorFilterDto } from './dto/filter-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
export declare class AuthorService {
    readonly repository: AuthorRepository;
    readonly slugService: SlugService;
    constructor(repository: AuthorRepository, slugService: SlugService);
    create(createAuthorDto: CreateAuthorDto): Promise<import("../../lib/repository").CreatedModel<import("./interface").IAuthorDocument>>;
    findAll(filterDto: AuthorFilterDto): Promise<{
        data: import("./interface").IAuthorDocument[];
        totalCount: number;
    }>;
    findOne(id: string): Promise<import("./interface").IAuthorDocument>;
    findBySlug(slug: string): Promise<{
        author: import("mongoose").Document<unknown, {}, import("./interface").IAuthorDocument> & import("./interface").IAuthor & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
        articles: import("../slug/interface").ISlugDocument[];
        totalArticles: number;
    }>;
    publishedPages(id: string): Promise<{
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
    updateOne(id: string, updateDto: UpdateAuthorDto): Promise<import("../../lib/repository").UpdatedModel>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("./interface").IAuthorDocument> & import("./interface").IAuthor & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
