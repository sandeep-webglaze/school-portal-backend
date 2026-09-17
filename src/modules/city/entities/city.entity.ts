import { Schema } from 'mongoose';

import { CITY_MODEL } from '@/src/lib/constants/models';
import { ICity } from '../interface';

const CitySchema = new Schema<ICity>({
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true, unique: true },
    icon: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    isPopularCity: { type: Boolean, default: false },
}, { timestamps: true });

export const CityModel = { name: CITY_MODEL, schema: CitySchema };
