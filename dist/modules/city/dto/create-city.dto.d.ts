import { ICity } from "../interface";
export declare class CreateCityDto implements ICity {
    country: string;
    state: string;
    city: string;
    icon: string;
    isPopularCity: boolean;
    slug: string;
}
