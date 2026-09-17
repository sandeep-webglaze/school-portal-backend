import { Document } from "mongoose";
import { ISlugMetaData } from "../slug/interface";
export interface IContactUs {
    phoneNumber: string;
    mail: string;
    address: string;
}
export interface ISocialMedia {
    facebook: string;
    intstagram: string;
    tweeter: string;
    linkedIn: string;
    youtube: string;
    pinterest: string;
}
export interface IAppConfig {
    contactUs: IContactUs;
    termsAndConditions?: string;
    privacyPolicy?: string;
    refundPolicy?: string;
    aboutUs?: string;
    socialMedia?: ISocialMedia;
    defaultSlugMetaData?: ISlugMetaData;
    defaultSlugJsonSchema?: string;
    robots?: string;
}
export type IAppConfigDocument = IAppConfig & Document;
