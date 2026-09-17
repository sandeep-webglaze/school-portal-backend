import { SLUG_TYPE } from '@/src/lib/constants';
import { PaginateParamDto } from '@/src/lib/shared';
import { ISlug } from '../interface';
import { SlugSchoolFilterDto } from './create-slug.dto';
export declare class SlugFilterDto extends PaginateParamDto implements Partial<ISlug>, Omit<SlugSchoolFilterDto, 'city' | 'type' | 'classification' | 'schoolBoard'> {
    slug?: string;
    isHomepageSlug?: boolean;
    type?: string[];
    classification?: string[];
    city?: string[];
    schoolBoard?: string[];
    school?: string;
    slugType?: SLUG_TYPE;
}
