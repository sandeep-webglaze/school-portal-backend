import { Schema } from 'mongoose';

import { FACILITY_MODEL } from '@/src/lib/constants/models';
import { IFacility } from '../interface';

const FacilitySchema = new Schema<IFacility>({
    name: { type: String, required: true },
    icon: { type: String, required: true }
});

export const FacilityModel = { name: FACILITY_MODEL, schema: FacilitySchema };