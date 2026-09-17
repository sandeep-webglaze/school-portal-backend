import { Schema } from "mongoose";

import { CITY_MODEL, SCHOOL_BOARD_MODEL, SCHOOL_CLASSIFICATION_MODEL, SCHOOL_MODEL, SCHOOL_TYPE_MODEL } from '@/src/lib/constants';
import { ISlugSchoolFilter } from "../../interface";

export const SlugSchoolFilterSchema = new Schema<ISlugSchoolFilter>({
    city: { type: Schema.Types.ObjectId, ref: CITY_MODEL },
    classification: { type: Schema.Types.ObjectId, ref: SCHOOL_CLASSIFICATION_MODEL },
    type: { type: Schema.Types.ObjectId, ref: SCHOOL_TYPE_MODEL },
    schoolBoard: { type: Schema.Types.ObjectId, ref: SCHOOL_BOARD_MODEL },
    school: { type: Schema.Types.ObjectId, ref: SCHOOL_MODEL },
})