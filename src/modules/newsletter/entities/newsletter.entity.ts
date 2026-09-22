import { Schema } from 'mongoose';

import { NEWSLETTER_MODEL } from '@/src/lib/constants';
import { INewsletter } from '../interface';

export const NewsletterSchema = new Schema<INewsletter>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  },
  { timestamps: true },
);

export const NewsletterModel = { name: NEWSLETTER_MODEL, schema: NewsletterSchema };
