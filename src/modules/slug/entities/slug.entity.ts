import { Schema } from 'mongoose';

import { AUTHOR_MODEL, SLUG_MODEL, SLUG_TYPE } from '@/src/lib/constants';
import { ISlug, ISlugFaq } from '../interface';
import { SlugSchoolFilterSchema } from './subdoc/slug-school-filter.subdoc';

// Sub-schema for a single admin-managed FAQ entry. `_id: false` keeps the
// stored array tidy — we only ever need question/answer.
const SlugFaqSchema = new Schema<ISlugFaq>(
  {
    question: { type: String, default: '' },
    answer: { type: String, default: '' },
  },
  { _id: false },
);

const SlugSchema = new Schema<ISlug>({
  slug: { type: String, required: true, unique: true },
  formattedText: { type: String, default: '' },
  slugMetaData: { type: Object, default: {} },
  slugJsonSchema: { type: String, default: '' },
  isHomepageSlug: { type: Boolean, default: false },
  filters: { type: SlugSchoolFilterSchema },
  slugContent: { type: String },
  // Admin-managed hero block for the /search/[slug] landing page. When empty
  // the web app falls back to a slug-generated heading/sub-heading.
  heroTitle: { type: String, default: '' },
  heroSubtitle: { type: String, default: '' },
  // Admin-uploaded banner image URL. When empty, the web app falls back to
  // the bundled default search banner background.
  heroImage: { type: String, default: '' },
  // Admin-managed FAQ list. Drives both the visible accordion and the
  // FAQPage JSON-LD on the search page. Empty => auto-generated FAQs.
  faqs: { type: [SlugFaqSchema], default: [] },
  // Admin-assigned author (E-E-A-T). Drives the "Expert Behind This Page"
  // box on the search page. null => no author box rendered.
  author: { type: Schema.Types.ObjectId, ref: AUTHOR_MODEL, default: null },
  slugType: {
    type: String,
    enum: Object.values(SLUG_TYPE),
    default: SLUG_TYPE.COMBINATION,
  },
});

export const SlugModel = { name: SLUG_MODEL, schema: SlugSchema };
