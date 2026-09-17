import { PaginateParamDto } from "@/src/lib/shared";
import { ISchoolType } from "../interface";
export declare class SchoolTypeFilterDto extends PaginateParamDto implements Partial<ISchoolType> {
    name?: string;
}
