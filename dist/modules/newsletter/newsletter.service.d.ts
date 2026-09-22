import { CreateNewsletterDto } from './dto/create-newsletter.dto';
import { NewsletterFilterDto } from './dto/filter-newsletter.dto';
import { NewsletterRepository } from './newsletter.repository';
export declare class NewsletterService {
    readonly repository: NewsletterRepository;
    constructor(repository: NewsletterRepository);
    create(dto: CreateNewsletterDto): Promise<import("../../lib/repository").CreatedModel<import("./interface").INewsletterDocument> | {
        email: string;
        message: string;
    }>;
    findAll(filterDto: NewsletterFilterDto): Promise<{
        data: import("./interface").INewsletterDocument[];
        totalCount: number;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("./interface").INewsletterDocument> & import("./interface").INewsletter & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
