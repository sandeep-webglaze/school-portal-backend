import { ITemplate } from "../interface";
interface IUserRegistrationOtpTemplateParam {
    supportMail: string;
    name: string;
    otp: string;
    validTill: number;
}
export declare function RegistrationUserTemplates({ supportMail, name, otp, validTill, }: IUserRegistrationOtpTemplateParam): ITemplate;
export {};
