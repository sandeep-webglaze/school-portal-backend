import { NewsletterService } from './newsletter.service';
import { CreateNewsletterDto } from './dto/create-newsletter.dto';
import { NewsletterFilterDto } from './dto/filter-newsletter.dto';
export declare class NewsletterController {
    private readonly service;
    constructor(service: NewsletterService);
    create(dto: CreateNewsletterDto): Promise<import("../../lib/repository").CreatedModel<import("./interface").INewsletterDocument> | {
        email: string;
        message: string;
    }>;
    findAll(filter: NewsletterFilterDto): Promise<{
        data: import("./interface").INewsletterDocument[];
        totalCount: number;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("./interface").INewsletterDocument> & import("./interface").INewsletter & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
