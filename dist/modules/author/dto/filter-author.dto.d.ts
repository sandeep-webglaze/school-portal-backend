import { PaginateParamDto } from '@/src/lib/shared/paginated_param.dto';
export declare class AuthorFilterDto extends PaginateParamDto {
    name: string;
    slug: string;
    isActive: boolean;
}
