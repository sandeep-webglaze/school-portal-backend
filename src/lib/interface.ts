import { SORTING_TYPE } from "./constants";

export type SortingType<T extends Object> = Partial<{
    [data in keyof T]: SORTING_TYPE;
}>;