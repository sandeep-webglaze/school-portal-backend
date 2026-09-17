import { Schema } from 'mongoose';

import { SCHOOL_CLASSIFICATION_MODEL } from '@/src/lib/constants';
import { ISchoolClassification } from '../interface';

const SchoolClassificationSchema = new Schema<ISchoolClassification>({
    name: { type: String, required: true }
}, { timestamps: true });

export const SchoolClassificationModel = { name: SCHOOL_CLASSIFICATION_MODEL, schema: SchoolClassificationSchema };