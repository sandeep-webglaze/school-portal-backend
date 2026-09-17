import { IAuthor, IAuthorCard, IAuthorStat } from '../interface';
export declare class AuthorStatDto implements IAuthorStat {
    value: string;
    label: string;
}
export declare class AuthorCardDto implements IAuthorCard {
    icon?: string;
    title: string;
    description?: string;
}
export declare class CreateAuthorDto implements IAuthor {
    name: string;
    slug: string;
    designation: string;
    photo?: string;
    shortBio: string;
    fullBioHtml?: string;
    quote?: string;
    linkedinUrl?: string;
    whatsappNumber?: string;
    stats?: AuthorStatDto[];
    specialisations?: AuthorCardDto[];
    credentials?: AuthorCardDto[];
    isActive: boolean;
}
