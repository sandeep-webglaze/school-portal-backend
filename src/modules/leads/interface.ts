import { Document } from "mongoose";

import { GENDER } from "@/src/lib/constants";
import { ISchoolTypeDocument } from "../school-types/interface";
import { ICityDocument } from "../city/interface";
import { IUserDocument } from "../user/interface";

/**
 * if the lead is purchased by multiple users then
 * below owner will removed and new entity is introduced like lead-buyers
 * which holds {user,school,lead} id's, School is for if school have 
 * multiple roles in future and one of the role manages school purchased leads.
 * and before buying leads must be freezed so no one should modify leads which are in ongoing transactions.
 */

export interface ILead {
    name: string,
    email: string,
    phoneNumber: string,
    schoolType: string | ISchoolTypeDocument,
    city: string | ICityDocument,
    class: string,
    gender: GENDER,
    actualPrice: number,
    currentPrice: number,
    generatedAt: Date,
    freezed: boolean,
    owner?: string | IUserDocument,
}
export type ILeadDocument = ILead & Document;
