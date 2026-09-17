import { ConflictException } from '@nestjs/common';
export declare class UserAlreadyExistsException extends ConflictException {
    constructor(message?: string);
}
