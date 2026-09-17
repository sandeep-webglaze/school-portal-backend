import { PaginateParamDto } from "../shared/paginated_param.dto";
export declare function createPaginatedMongoOptions<T extends PaginateParamDto>(queryParams: T): Omit<T, 'page'> & {
    limit: number;
    skip: number;
};
