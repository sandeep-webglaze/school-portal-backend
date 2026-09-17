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
