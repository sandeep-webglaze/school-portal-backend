import { ITemplate } from "../interface";
interface IParam {
    supportMail: string;
    name: string;
    otp: string;
    validTill: number;
}
export declare function ForgotPasswordTemplates({ supportMail, name, otp, validTill, }: IParam): ITemplate;
export {};
