import { NotFoundException } from '@nestjs/common';
export declare class NoDataFoundException extends NotFoundException {
    constructor(message?: string);
}
