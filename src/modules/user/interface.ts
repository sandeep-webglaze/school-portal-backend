import { Document } from 'mongoose';

import {
  USER_ROLE,
  USER_STATUS,
  USER_VERIFICATION_STATUS,
} from '@/src/lib/constants';
import { ISchoolDocument } from '../school/interface';

export interface IUser {
  name: string;
  mail?: string;
  phoneNumber?: string;
  password?: string;
  role: USER_ROLE;
  status: USER_STATUS;
  verificationStatus: USER_VERIFICATION_STATUS;
  imageUrl?: string;
  school?: string | ISchoolDocument;
  lastLoginAt?: Date;
  platform?: string;
}
export type IUserDocument = IUser & Document;
export type IUserObj = Pick<IUserDocument, keyof IUser | '_id' | 'id'> & {
  createdAt: string;
  updatedAt: string;
};
