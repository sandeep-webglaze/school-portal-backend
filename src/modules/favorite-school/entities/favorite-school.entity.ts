import { Schema, Types } from "mongoose";

import { FAVORITE_SCHOOL_MODEL, SCHOOL_MODEL, USER_MODEL } from "@/src/lib/constants";
import { IFavoriteSchool } from "../interface";

export const FavoriteSchema = new Schema<IFavoriteSchool>({
    user: { type: Schema.Types.ObjectId, required: true, ref: USER_MODEL },
    school: { type: Schema.Types.ObjectId, required: true, ref: SCHOOL_MODEL },
}, { timestamps: true })

FavoriteSchema.index({ user: 1, school: 1 }, { unique: true });

export const FavoriteSchoolModel = { name: FAVORITE_SCHOOL_MODEL, schema: FavoriteSchema };
