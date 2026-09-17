import { SLUG_TYPE } from '@/src/lib/constants';
import { ISlugSchoolFilter, ISlug, ISlugMetaData, ISlugMetaRobots, ISlugMetaOpenGraph, ISlugMetaTweeter, ISlugFaq } from '../interface';
declare class SlugMetaRobotsDto implements ISlugMetaRobots {
    index: boolean;
    follow: boolean;
    noarchive: boolean;
    nosnippet: boolean;
    noimageindex: boolean;
    nocache: boolean;
    notranslate: boolean;
    indexifembedded: boolean;
    nositelinkssearchbox: boolean;
    unavailable_after: string;
    'max-video-preview': string;
    'max-image-preview': string;
    'max-snippet': number;
}
declare class SlugMetaOpenGraphDto implements ISlugMetaOpenGraph {
    locale: string;
    type: string;
    title: string;
    description: string;
    url: string;
    images: string;
    siteName: string;
}
declare class SlugMetaTweeterDto implements ISlugMetaTweeter {
    card: string;
    title: string;
    description: string;
    site: string;
    images: string;
    creator: string;
}
export declare class SlugMetaDataDto implements ISlugMetaData {
    title: string;
    description: string;
    keywords?: string;
    robots: SlugMetaRobotsDto;
    openGraph: SlugMetaOpenGraphDto;
    twitter: SlugMetaTweeterDto;
}
export declare class SlugSchoolFilterDto implements ISlugSchoolFilter {
    classification?: string;
    schoolBoard?: string;
    type?: string;
    city?: string;
    school?: string;
}
export declare class SlugFaqDto implements ISlugFaq {
    question: string;
    answer: string;
}
export declare class CreateSlugDto implements ISlug {
    slugMetaData: SlugMetaDataDto;
    slugJsonSchema: string;
    slugContent: string;
    slug: string;
    formattedText: string;
    isHomepageSlug: boolean;
    filters?: SlugSchoolFilterDto;
    slugType: SLUG_TYPE;
    heroTitle?: string;
    heroSubtitle?: string;
    heroImage?: string;
    faqs?: SlugFaqDto[];
    author?: string | null;
}
export {};
