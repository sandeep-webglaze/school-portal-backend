import { Document } from "mongoose";
import { GENDER } from "@/src/lib/constants";
import { ISchoolTypeDocument } from "../school-types/interface";
import { ICityDocument } from "../city/interface";
import { IUserDocument } from "../user/interface";
export interface ILead {
    name: string;
    email: string;
    phoneNumber: string;
    schoolType: string | ISchoolTypeDocument;
    city: string | ICityDocument;
    class: string;
    gender: GENDER;
    actualPrice: number;
    currentPrice: number;
    generatedAt: Date;
    freezed: boolean;
    owner?: string | IUserDocument;
}
export type ILeadDocument = ILead & Document;
