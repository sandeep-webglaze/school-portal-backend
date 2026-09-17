import { ITemplate } from "../interface";
interface ISchoolEnquiryTemplateParam {
    name: string;
    email: string;
    phoneNumber: string;
    userClass: string;
    gender: string;
    message?: string;
}
export declare function SchoolEnquiryTemplates(param: ISchoolEnquiryTemplateParam): ITemplate;
export {};
