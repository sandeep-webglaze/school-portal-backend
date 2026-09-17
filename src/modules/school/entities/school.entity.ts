import { Schema } from 'mongoose';

import { CITY_MODEL, FACILITY_MODEL, FAVORITE_SCHOOL_MODEL, SCHOOL_BOARD_MODEL, SCHOOL_CLASSIFICATION_MODEL, SCHOOL_MODEL, SCHOOL_TYPE_MODEL, SLUG_MODEL, USER_MODEL } from '@/src/lib/constants/models';
import { ISchool } from '../interface';

const SchoolSchema = new Schema<ISchool>(
  {
    name: { type: String, required: true },
    chairman: { type: String, required: true },
    medium: { type: String, required: true },
    admissionStart: { type: String, required: true },
    admissionEnd: { type: String, required: true },
    contactNumber: { type: String, required: true },
    mail: { type: String, required: true },
    website: { type: String, required: true },
    about: { type: String, required: true },
    classFrom: { type: String, required: true },
    classTo: { type: String, required: true },
    classification: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: SCHOOL_CLASSIFICATION_MODEL,
    },
    type: {
      type: [{ type: Schema.Types.ObjectId, ref: SCHOOL_TYPE_MODEL }],
      default: [],
    },
    city: { type: Schema.Types.ObjectId, required: true, ref: CITY_MODEL },
    slug: { type: String, required: true, ref: SLUG_MODEL, unique: true },
    images: { type: [String], default: [] },
    schoolBoards: {
      type: [{ type: Schema.Types.ObjectId, ref: SCHOOL_BOARD_MODEL }],
      default: [],
    },
    facilities: {
      type: [{ type: Schema.Types.ObjectId, ref: FACILITY_MODEL }],
      default: [],
    },
    establishmentYear: { type: Number, required: true },
    minFees: { type: Number, required: true },
    maxFees: { type: Number, required: true },
    avgRating: { type: Number, default: 0 },
    avgAcademicsRating: { type: Number, default: 0 },
    avgAddmissionRating: { type: Number, default: 0 },
    avgExtracurriclarRating: { type: Number, default: 0 },
    avgInfrastructureRating: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    published: { type: Boolean, default: false },
    featuredPriority: { type: Number },
  },
  { timestamps: true },
);

// Indexes
SchoolSchema.index({ slug: 1 }, { unique: true }); // Unique index on slug
SchoolSchema.index({ name: "text" }); // Text index for full-text search
SchoolSchema.index({ classification: 1, type: 1, schoolBoards: 1 }); // Compound Index on classification & type & schoolBoards
SchoolSchema.index({ minFees: 1, maxFees: 1 }); // Index on Fees
SchoolSchema.index({ isFeatured: 1, featuredPriority: 1 }); // Compound Index on isFeatured & featuredPriority
SchoolSchema.index({ city: 1 }); // Index on city
SchoolSchema.index({ createdAt: -1 });

SchoolSchema.virtual('reviews', {
  justOne: true,
});

SchoolSchema.virtual('isFavorite', {
  ref: FAVORITE_SCHOOL_MODEL,
  localField: '_id',
  foreignField: 'school',
  justOne: true,
  count: true,
  getters: true
}).get(val => val > 0)

export const SchoolModel = { name: SCHOOL_MODEL, schema: SchoolSchema };
