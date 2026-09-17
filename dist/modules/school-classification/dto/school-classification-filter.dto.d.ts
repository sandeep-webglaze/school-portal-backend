import { PaginateParamDto } from "@/src/lib/shared";
import { ISchoolClassification } from "../interface";
export declare class SchoolClassificationFilterDto extends PaginateParamDto implements Partial<ISchoolClassification> {
    name?: string;
}
