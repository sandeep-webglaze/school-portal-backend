import { PaginateParamDto } from '@/src/lib/shared';
import { IFacility } from '../interface';
export declare class CreateFacilityDto implements IFacility {
    name: string;
    icon: string;
}
declare const UpdateFacilityDto_base: import("@nestjs/common").Type<Partial<CreateFacilityDto>>;
export declare class UpdateFacilityDto extends UpdateFacilityDto_base {
}
export declare class FacilityFilterDto extends PaginateParamDto implements Partial<IFacility> {
    name?: string;
}
export {};
