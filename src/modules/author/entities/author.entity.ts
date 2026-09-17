import { Schema } from 'mongoose';

import { AUTHOR_MODEL } from '@/src/lib/constants/models';
import { IAuthor, IAuthorCard, IAuthorStat } from '../interface';

// Sub-schema for stat chips ("2,000+ School visits"). `_id: false` keeps the
// stored array tidy — the web app only needs value/label pairs.
const AuthorStatSchema = new Schema<IAuthorStat>(
  {
    value: { type: String, default: '' },
    label: { type: String, default: '' },
  },
  { _id: false },
);

// Sub-schema shared by specialisation and credential cards on the author page.
const AuthorCardSchema = new Schema<IAuthorCard>(
  {
    icon: { type: String, default: '' },
    title: { type: String, default: '' },
    description: { type: String, default: '' },
  },
  { _id: false },
);

const AuthorSchema = new Schema<IAuthor>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    designation: { type: String, default: '' },
    photo: { type: String, default: '' },
    shortBio: { type: String, default: '' },
    fullBioHtml: { type: String, default: '' },
    quote: { type: String, default: '' },
    linkedinUrl: { type: String, default: '' },
    whatsappNumber: { type: String, default: '' },
    stats: { type: [AuthorStatSchema], default: [] },
    specialisations: { type: [AuthorCardSchema], default: [] },
    credentials: { type: [AuthorCardSchema], default: [] },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const AuthorModel = { name: AUTHOR_MODEL, schema: AuthorSchema };
