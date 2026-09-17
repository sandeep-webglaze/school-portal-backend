import { GENDER } from "@/src/lib/constants";
import { ISchoolEnquiry } from "../../school-enquiry/interface";
import { ILead } from "../interface";
export declare class CreateLeadDto implements Omit<ILead, 'freezed'> {
    name: string;
    email: string;
    phoneNumber: string;
    schoolType: string;
    city: string;
    class: string;
    gender: GENDER;
    message?: string;
    actualPrice: number;
    currentPrice: number;
    generatedAt: Date;
    static create_lead_from_enquiry(enquiry: ISchoolEnquiry): CreateLeadDto;
}
