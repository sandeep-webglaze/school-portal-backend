import { ICity } from "../interface";
import { PaginateParamDto } from "@/src/lib/shared/paginated_param.dto";
export declare class CityFilterDto extends PaginateParamDto implements Partial<ICity> {
    country: string;
    state: string;
    city: string;
    slug: string;
    isPopularCity: boolean;
}
