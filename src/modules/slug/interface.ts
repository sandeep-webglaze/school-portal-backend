import { Document, Types } from 'mongoose';

import { SLUG_TYPE } from '@/src/lib/constants';
import { ISchool } from '../school/interface';

export type ISlugSchoolFilter = Partial<
  Pick<ISchool, 'classification' | 'city'>
> & {
  // other filter
  type?: string | Types.ObjectId;
  schoolBoard?: string | Types.ObjectId;
  school?: string | Types.ObjectId;
};

export type ISlugMetaRobots = {
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
};

export type ISlugMetaOpenGraph = {
  locale: string;
  type: string;
  title: string;
  description: string;
  url: string;
  images: string;
  siteName: string;
};

export type ISlugMetaTweeter = {
  card: string;
  title: string;
  description: string;
  site: string;
  images: string;
  creator: string;
};

export type ISlugMetaData = {
  title: string;
  description: string;
  /** Comma-separated SEO keywords for this slug page. */
  keywords?: string;
  robots: ISlugMetaRobots;
  openGraph: ISlugMetaOpenGraph;
  twitter: ISlugMetaTweeter;
};

/** A single admin-managed FAQ entry rendered on the search/[slug] page. */
export type ISlugFaq = {
  question: string;
  answer: string;
};

export type ISlug = {
  slug: string;
  slugMetaData: ISlugMetaData;
  slugJsonSchema: string;
  formattedText: string;
  isHomepageSlug: boolean;
  filters?: ISlugSchoolFilter;
  slugType: SLUG_TYPE;
  slugContent?: string;
  /** Admin-managed on-page H1 for the search landing page. */
  heroTitle?: string;
  /** Admin-managed sub-heading shown beneath the hero H1. */
  heroSubtitle?: string;
  /** Admin-uploaded banner image URL used as the search page hero background. */
  heroImage?: string;
  /** Admin-managed FAQ list — drives the on-page accordion + FAQPage schema. */
  faqs?: ISlugFaq[];
  /** Admin-assigned author (ObjectId, populated on public reads). null => no author box. */
  author?: Types.ObjectId | string | null;
};
export type ISlugDocument = ISlug & Document;
