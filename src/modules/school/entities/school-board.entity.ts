import { Schema } from 'mongoose';

import { SCHOOL_BOARD_MODEL } from '@/src/lib/constants/models';
import { ISchoolBoard } from '../interface';

const SchoolBoardSchema = new Schema<ISchoolBoard>({
    name: { type: String, required: true },
    featured: { type: Boolean, default: false }
}, { timestamps: true });

export const SchoolBoardModel = { name: SCHOOL_BOARD_MODEL, schema: SchoolBoardSchema };