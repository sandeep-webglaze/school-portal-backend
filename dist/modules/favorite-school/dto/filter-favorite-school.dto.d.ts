import { PaginateParamDto } from '@/src/lib/shared';
import { IFavoriteSchool } from '../interface';
export declare class FilterFavoriteSchoolDto extends PaginateParamDto implements Pick<IFavoriteSchool, 'user'> {
    user: string;
}
