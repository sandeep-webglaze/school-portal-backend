import { Document } from 'mongoose';

export interface ICTAEnquiry {
  phoneNumber: string;
  name: string;
  pageUrl: string;
}
export type ICTAEnquiryDocument = ICTAEnquiry & Document;
