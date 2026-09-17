import { SlugMetaDataDto } from "../../slug/dto/create-slug.dto";
import { IAppConfig, IContactUs, ISocialMedia } from "../interface";
export declare class ContactUsDto implements IContactUs {
    phoneNumber: string;
    mail: string;
    address: string;
}
export declare class SocialMediaLinkDto implements ISocialMedia {
    facebook: string;
    intstagram: string;
    tweeter: string;
    linkedIn: string;
    youtube: string;
    pinterest: string;
}
export declare class CreateAppConfigurationDto implements Partial<IAppConfig> {
    contactUs: ContactUsDto;
    termsAndConditions?: string;
    privacyPolicy?: string;
    refundPolicy?: string;
    aboutUs?: string;
    defaultSlugJsonSchema?: string;
    robots?: string;
    socialMedia?: SocialMediaLinkDto;
    defaultSlugMetaData?: SlugMetaDataDto;
}
