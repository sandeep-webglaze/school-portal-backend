import { PaginateParamDto } from "@/src/lib/shared";
import { SCHOOL_REQUEST_STATUS } from "@/src/lib/constants";
import { ISchoolRequest } from "../interface";
import { UpdateSchoolDto } from "./school.dto";
declare const SchoolChangesDto_base: import("@nestjs/common").Type<Omit<UpdateSchoolDto, "city" | "avgRating" | "avgAcademicsRating" | "avgInfrastructureRating" | "avgAddmissionRating" | "avgExtracurriclarRating" | "isFeatured" | "published" | "slug">>;
export declare class SchoolChangesDto extends SchoolChangesDto_base {
}
export declare class CreateSchoolRequestDto implements Omit<ISchoolRequest, 'school'> {
    status: SCHOOL_REQUEST_STATUS;
    requestedChanges: SchoolChangesDto;
}
declare const UpdateSchoolRequestDto_base: import("@nestjs/common").Type<Partial<CreateSchoolRequestDto>>;
export declare class UpdateSchoolRequestDto extends UpdateSchoolRequestDto_base {
}
export declare class SchoolRequestFilterDto extends PaginateParamDto implements Partial<ISchoolRequest> {
    status?: SCHOOL_REQUEST_STATUS;
    school: string;
}
export {};
