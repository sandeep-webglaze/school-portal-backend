/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Document } from 'mongoose';
import { GENDER, SCHOOL_ENQUIRY_STATUS } from '@/src/lib/constants';
import { ISchoolTypeDocument } from '../school-types/interface';
import { ICityDocument } from '../city/interface';
export interface ISchoolEnquiry {
    name: string;
    email: string;
    phoneNumber: string;
    schoolType: string | ISchoolTypeDocument;
    city: string | ICityDocument;
    class: string;
    userIp: string;
    pageUrl: string;
    gender: GENDER;
    status: SCHOOL_ENQUIRY_STATUS;
    submittedAt: Date;
    message?: string;
    platform?: string;
}
export type ISchoolEnquiryDocument = ISchoolEnquiry & Document;
