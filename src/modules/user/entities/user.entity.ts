import { Schema, Types } from 'mongoose';
import * as argon2 from 'argon2';

import {
  SCHOOL_MODEL,
  USER_MODEL,
  USER_ROLE,
  USER_STATUS,
  USER_VERIFICATION_STATUS,
} from '@/src/lib/constants';
import { IUser, IUserDocument } from '../interface';

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    mail: { type: String, unique: true },
    phoneNumber: { type: String, unique: true },
    password: { type: String, required: false },
    role: { type: String, enum: Object.values(USER_ROLE), required: true },
    status: {
      type: String,
      enum: Object.values(USER_STATUS),
      default: USER_STATUS.ACTIVE,
    },
    verificationStatus: {
      type: String,
      enum: Object.values(USER_VERIFICATION_STATUS),
      default: USER_VERIFICATION_STATUS.PENDING,
    },
    imageUrl: { type: String },
    school: { type: Types.ObjectId, ref: SCHOOL_MODEL },
    lastLoginAt: { type: Date },
    platform: { type: String },
  },
  { timestamps: true },
);

UserSchema.index(
  { mail: 1 },
  { unique: true, partialFilterExpression: { mail: { $type: 'string' } } },
);
UserSchema.index(
  { phoneNumber: 1 },
  {
    unique: true,
    partialFilterExpression: { phoneNumber: { $type: 'string' } },
  },
);

export async function hashUserPassword(password: string) {
  return await argon2.hash(password);
}

export function toUserObj(user: IUserDocument) {
  const { password, ...userBody } = user.toJSON();
  return userBody;
}

/* Schema methods */
UserSchema.pre('save', async function (this: IUserDocument, next) {
  let user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();
  try {
    if (this.password != null && this.password != '')
      this.password = await hashUserPassword(this.password);
    next();
  } catch (error) {
    return next(error);
  }
});

export const comparePassword = async (param: {
  currentPassword: string;
  comparePassword: string;
}) => {
  return await argon2.verify(param.currentPassword, param.comparePassword);
};

export const UserModel = { name: USER_MODEL, schema: UserSchema };
