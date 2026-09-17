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
import { Document } from "mongoose";
import { SCHOOL_REQUEST_STATUS } from "@/src/lib/constants";
import { ICityDocument } from "../city/interface";
import { ISchoolTypeDocument } from "../school-types/interface";
import { ISchoolClassificationDocument } from "../school-classification/interface";
export interface IFacility {
    name: string;
    icon: string;
}
export type IFacilityDocument = IFacility & Document;
export interface ISchoolBoard {
    name: string;
    featured: boolean;
}
export type ISchoolBoardDocument = ISchoolBoard & Document;
export interface ISchool {
    name: string;
    chairman: string;
    medium: string;
    admissionStart: string;
    admissionEnd: string;
    contactNumber: string;
    mail: string;
    website: string;
    about: string;
    classFrom: string;
    classTo: string;
    city: string | ICityDocument;
    images: string[];
    schoolBoards: string[] | ISchoolBoardDocument[];
    facilities: string[] | IFacilityDocument[];
    type: string[] | ISchoolTypeDocument[];
    classification: string | ISchoolClassificationDocument;
    establishmentYear: number;
    minFees: number;
    maxFees: number;
    avgRating: number;
    avgAcademicsRating: number;
    avgInfrastructureRating: number;
    avgAddmissionRating: number;
    avgExtracurriclarRating: number;
    isFeatured: boolean;
    published: boolean;
    slug: string;
    featuredPriority?: number;
}
export type ISchoolDocument = ISchool & Document;
export type ISchoolRequest = {
    school: string | ISchoolDocument;
    status: SCHOOL_REQUEST_STATUS;
    requestedChanges: Partial<ISchool>;
};
export type ISchoolRequestDocument = ISchoolRequest & Document;
