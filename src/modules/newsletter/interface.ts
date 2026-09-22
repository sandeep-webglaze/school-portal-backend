import { Document } from 'mongoose';

export interface INewsletter {
  email: string;
}
export type INewsletterDocument = INewsletter & Document;
