import { PaginateParamDto } from '@/src/lib/shared';
import { SortingType } from '@/src/lib/interface';
import { SORTING_TYPE } from '@/src/lib/constants';
import { ISchool } from '../interface';
type ISchoolFilters = Pick<ISchool, 'isFeatured' | 'city' | 'published'>;
declare class SchoolSortBy implements SortingType<ISchool> {
    maxFees?: SORTING_TYPE;
    minFees?: SORTING_TYPE;
    avgRating?: SORTING_TYPE;
    createdAt?: SORTING_TYPE;
    isFeatured?: SORTING_TYPE;
}
export declare class SchoolFilterDto extends PaginateParamDto implements ISchoolFilters {
    includeId?: string[];
    excludeId?: string[];
    userId?: string;
    classification?: string[];
    type?: string[];
    schoolBoards?: string[];
    minFees: number;
    maxFees: number;
    categorySlug?: string;
    isFeatured: boolean;
    published: boolean;
    city: string;
    name?: string;
    sortBy: SchoolSortBy;
}
export {};
