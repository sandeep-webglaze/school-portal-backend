import { Document } from 'mongoose'

export interface ISchoolClassification {
    name: string,
}
export type ISchoolClassificationDocument = ISchoolClassification & Document;