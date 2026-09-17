import { ConflictException, NotFoundException } from '@nestjs/common';

export class UserAlreadyExistsException extends ConflictException {
    constructor(message?: string) {
        super(message ?? 'User already exists with given credentials');
    }
}