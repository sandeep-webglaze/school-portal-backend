import { PaginateParamDto } from "../shared/paginated_param.dto";

export function createPaginatedMongoOptions<T extends PaginateParamDto>(queryParams: T): Omit<T, 'page'> & { limit: number, skip: number } {
    const page = queryParams?.page ?? 1;
    const limit = queryParams?.limit ?? 10;
    const skip = (page - 1) * limit;

    if (queryParams) delete queryParams.page;
    return { ...queryParams, limit, skip };
}