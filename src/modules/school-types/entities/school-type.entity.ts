import { Schema } from 'mongoose';

import { SCHOOL_TYPE_MODEL } from '@/src/lib/constants';
import { ISchoolType } from '../interface';

const SchoolTypeSchema = new Schema<ISchoolType>({
    name: { type: String, required: true }
}, { timestamps: true });

export const SchoolTypeModel = { name: SCHOOL_TYPE_MODEL, schema: SchoolTypeSchema };