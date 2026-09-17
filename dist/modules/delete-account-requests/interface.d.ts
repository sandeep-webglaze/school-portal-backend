import { Document } from "mongoose";
import { IUserDocument } from "../user/interface";
export interface IDeleteAccountRequest {
    userId: string | IUserDocument;
    email: string;
    name: string;
    reason?: string;
}
export type IDeleteAccountRequestDocument = IDeleteAccountRequest & Document;
