import { IsEmail, IsNotEmpty, IsObject, IsOptional, IsPhoneNumber, IsString, IsUrl, Length, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

import { SlugMetaDataDto } from "../../slug/dto/create-slug.dto";
import { IAppConfig, IContactUs, ISocialMedia } from "../interface";

export class ContactUsDto implements IContactUs {
    @ApiProperty({ required: true, example: "1212121212", description: "Phone number for contact us" })
    @IsPhoneNumber('IN')
    phoneNumber: string;

    @ApiProperty({ required: true, example: "contact@mail.com", description: "Contact us mail" })
    @IsEmail()
    mail: string;

    @ApiProperty({ required: false, example: "street no.1, new york,", description: "Contacting address" })
    @IsOptional()
    @IsString()
    @Length(3, 500)
    address: string;
}

export class SocialMediaLinkDto implements ISocialMedia {
    @ApiProperty({ required: false, example: "http://facebook.com/my-facebook-profile", description: "Link of the facebook profile" })
    @IsOptional()
    @IsUrl()
    facebook: string;

    @ApiProperty({ required: false, example: "http://instagram.com/my-instagram-profile", description: "Link of the instagram profile" })
    @IsOptional()
    @IsUrl()
    intstagram: string;

    @ApiProperty({ required: false, example: "http://tweeter.com/my-tweeter-profile", description: "Link of the tweeter profile" })
    @IsOptional()
    @IsUrl()
    tweeter: string;

    @ApiProperty({ required: false, example: "http://linkedin.com/my-linkedin-profile", description: "Link of the linkedin profile" })
    @IsOptional()
    @IsUrl()
    linkedIn: string;

    @ApiProperty({ required: false, example: "http://youtube.com/my-youtube-profile", description: "Link of the youtube page" })
    @IsOptional()
    @IsUrl()
    youtube: string;

    @ApiProperty({ required: false, example: "http://pinterest.com/my-pinterest-profile", description: "Link of the pinterest portfolio" })
    @IsOptional()
    @IsUrl()
    pinterest: string;
}

export class CreateAppConfigurationDto implements Partial<IAppConfig> {
    @ApiProperty({ required: false, type: ContactUsDto, description: "Object for contact us detail" })
    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => ContactUsDto)
    contactUs: ContactUsDto;

    @ApiProperty({ required: false, description: "Terms and conditions for the platform" })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    termsAndConditions?: string;

    @ApiProperty({ required: false, description: "Privacy policies for the platform" })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    privacyPolicy?: string;

    @ApiProperty({ required: false, description: "Refund policies for the platform" })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    refundPolicy?: string;

    @ApiProperty({ required: false, description: "About us for the platform" })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    aboutUs?: string;

    @ApiProperty({ required: false, description: "Json string for SEO related data" })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    defaultSlugJsonSchema?: string;

    @ApiProperty({ required: false, description: "string for SEO related data" })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    robots?: string;

    @ApiProperty({ required: false, type: SocialMediaLinkDto, description: "Object for Social media links" })
    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => SocialMediaLinkDto)
    socialMedia?: SocialMediaLinkDto;

    @ApiProperty({ required: false, type: SlugMetaDataDto, description: "Object for SEO and meta data of the slug" })
    @IsOptional()
    @IsNotEmpty()
    @IsObject()
    @ValidateNested()
    @Type(() => SlugMetaDataDto)
    defaultSlugMetaData?: SlugMetaDataDto;
}
