import { Document } from 'mongoose';

export interface IClaimSchoolEnquiry {
  name: string;
  email: string;
  phoneNumber: string;
  school: string;
  schoolAddress: string;
}
export type IClaimSchoolEnquiryDocument = IClaimSchoolEnquiry & Document;
