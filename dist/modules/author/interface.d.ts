import { Document } from 'mongoose';
export interface IAuthorStat {
    value: string;
    label: string;
}
export interface IAuthorCard {
    icon?: string;
    title: string;
    description?: string;
}
export interface IAuthor {
    name: string;
    slug: string;
    designation: string;
    photo?: string;
    shortBio: string;
    fullBioHtml?: string;
    quote?: string;
    linkedinUrl?: string;
    whatsappNumber?: string;
    stats?: IAuthorStat[];
    specialisations?: IAuthorCard[];
    credentials?: IAuthorCard[];
    isActive: boolean;
}
export type IAuthorDocument = IAuthor & Document;
