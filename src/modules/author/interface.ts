import { Document } from 'mongoose';

/** A single stat chip shown on the author bio box / author page (e.g. "2,000+" / "School visits"). */
export interface IAuthorStat {
  value: string;
  label: string;
}

/** A titled card (specialisation or credential) rendered on the author page. */
export interface IAuthorCard {
  /** Emoji or short icon text, e.g. "🏫". */
  icon?: string;
  title: string;
  description?: string;
}

export interface IAuthor {
  /** Display name, e.g. "Gaurav Sharma". */
  name: string;
  /** URL slug for the public author page, e.g. "gaurav-sharma" → /author/gaurav-sharma. */
  slug: string;
  /** Role line, e.g. "School Admission Expert · Education Advisor at EdHippo". */
  designation: string;
  /** Profile photo URL. Empty → web app renders initials avatar. */
  photo?: string;
  /** Short plain-text bio for the inline "Expert Behind This Page" box (2–4 sentences). */
  shortBio: string;
  /** Rich HTML "About me" content for the dedicated author page. */
  fullBioHtml?: string;
  /** Pull-quote shown on the author page. */
  quote?: string;
  linkedinUrl?: string;
  /** WhatsApp number in international format, e.g. "919876543210". */
  whatsappNumber?: string;
  stats?: IAuthorStat[];
  specialisations?: IAuthorCard[];
  credentials?: IAuthorCard[];
  /** Inactive authors are hidden from public pages but stay assigned to slugs. */
  isActive: boolean;
}

export type IAuthorDocument = IAuthor & Document;
