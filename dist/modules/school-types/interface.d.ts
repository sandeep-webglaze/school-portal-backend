import { Document } from 'mongoose';
export interface ISchoolType {
    name: string;
}
export type ISchoolTypeDocument = ISchoolType & Document;
