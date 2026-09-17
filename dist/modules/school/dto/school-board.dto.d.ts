import { PaginateParamDto } from "@/src/lib/shared";
import { ISchoolBoard } from "../interface";
export declare class CreateSchoolBoardDto implements ISchoolBoard {
    name: string;
    featured: boolean;
}
declare const UpdateSchoolBoardDto_base: import("@nestjs/common").Type<Partial<CreateSchoolBoardDto>>;
export declare class UpdateSchoolBoardDto extends UpdateSchoolBoardDto_base {
}
export declare class SchoolBoardFilterDto extends PaginateParamDto implements Partial<ISchoolBoard> {
    name?: string;
    featured: boolean;
}
export {};
