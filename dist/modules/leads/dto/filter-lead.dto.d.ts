import { GENDER } from '@/src/lib/constants';
import { PaginateParamDto } from '@/src/lib/shared';
import { ILead } from '../interface';
export declare class LeadFilterDto extends PaginateParamDto implements Partial<ILead> {
    schoolType: string;
    city: string;
    gender: GENDER;
    currentPrice: number;
    minPrice: number;
    maxPrice: number;
    generatedAt: Date;
    owner?: string;
    purchased: boolean;
}
