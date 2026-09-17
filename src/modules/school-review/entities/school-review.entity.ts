import { Schema } from 'mongoose';

import { SCHOOL_REVIEWS_MODEL, SCHOOL_MODEL, USER_MODEL } from '@/src/lib/constants';
import { ISchoolReview } from '../interface';

const SchoolReviewSchema = new Schema<ISchoolReview>({
    user: { type: Schema.Types.ObjectId, required: true, ref: USER_MODEL },
    schoolId: { type: Schema.Types.ObjectId, required: true, ref: SCHOOL_MODEL },
    overallRating: { type: Number, required: true },
    review: { type: String, required: true },
    academics: { type: Number, required: true },
    addmission: { type: Number, required: true },
    extracurriclar: { type: Number, required: true },
    infrastructure: { type: Number, required: true },
}, { strict: true, strictQuery: true, timestamps: true });

export const SchoolReviewModel = { name: SCHOOL_REVIEWS_MODEL, schema: SchoolReviewSchema };