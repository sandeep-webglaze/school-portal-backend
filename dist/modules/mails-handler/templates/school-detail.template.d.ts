import { ITemplate } from '../interface';
interface ISchoolDetailTemplateParam {
    name: string;
    slug: string;
    city: string;
    classification: string;
    chairman: string;
    medium: string;
    admissionStart: string;
    admissionEnd: string;
    classFrom: string;
    classTo: string;
    establishmentYear: number;
}
export declare function SchoolDetailTemplates(param: ISchoolDetailTemplateParam): ITemplate;
export {};
