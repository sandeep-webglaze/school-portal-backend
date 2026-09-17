import { Schema } from 'mongoose';
import * as moment from 'moment';

import { OTP_MAX_RETRIES, OTP_MODEL, OTP_STATUS, OTP_TIME_OUT_MINUTE, OTP_TTL_SECONDS } from '@/src/lib/constants';
import { IOtp } from '../interface';

export const OtpSchema = new Schema<IOtp>(
  {
    otp: {
      type: String
    },
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId
    },


    
    status: {
      type: String,
      required: true,
      enum: Object.values(OTP_STATUS),
      default: OTP_STATUS.CREATED
    },
    timeout: {
      type: Date,
      default: moment(Date.now()).add(OTP_TIME_OUT_MINUTE, 'm').toDate(),
      required: true
    },
    retriesLeft: {
      type: Number,
      required: true,
      default: OTP_MAX_RETRIES
    }
  },
  {
    timestamps: true
  }
);

OtpSchema.index({ createdAt: 1 }, { expireAfterSeconds: OTP_TTL_SECONDS });

export const OtpModel = { name: OTP_MODEL, schema: OtpSchema };