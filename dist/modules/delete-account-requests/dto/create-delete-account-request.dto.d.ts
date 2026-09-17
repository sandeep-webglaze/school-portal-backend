import { IDeleteAccountRequest } from "../interface";
export declare class CreateDeleteAccountRequestDto implements Pick<IDeleteAccountRequest, 'reason'> {
    reason?: string;
}
