import { Document } from "mongoose";
export interface ICity {
    country: string;
    state: string;
    city: string;
    icon: string;
    isPopularCity: boolean;
    slug: string;
}
export type ICityDocument = ICity & Document;
