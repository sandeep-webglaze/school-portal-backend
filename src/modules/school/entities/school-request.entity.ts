import { Schema, Types } from 'mongoose';

import { SCHOOL_REQUEST_STATUS } from '@/src/lib/constants';
import { SCHOOL_MODEL, SCHOOL_REQUEST_MODEL } from '@/src/lib/constants/models';
import { ISchoolRequest } from '../interface';
import { SchoolModel } from './school.entity';

const SchoolRequestSchema = new Schema<ISchoolRequest>({
    school: { type: Types.ObjectId, required: true, ref: SCHOOL_MODEL },
    status: { type: String, enum: Object.values(SCHOOL_REQUEST_STATUS), default: SCHOOL_REQUEST_STATUS.PENDING },
    requestedChanges: { type: SchoolModel.schema, required: true }
}, { timestamps: true });

export const SchoolRequestModel = { name: SCHOOL_REQUEST_MODEL, schema: SchoolRequestSchema };
