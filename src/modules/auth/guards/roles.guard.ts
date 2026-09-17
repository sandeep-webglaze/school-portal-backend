import { Injectable, CanActivate, ExecutionContext, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AUTH_ROLES_KEY, CURRENT_USER_REQ_KEY, USER_ROLE } from '@/src/lib/constants';
import { IUserDocument } from '../../user/interface';

export const AllowedRoles = (...roles: USER_ROLE[]) => SetMetadata(AUTH_ROLES_KEY, roles);

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<USER_ROLE[]>(AUTH_ROLES_KEY, [context.getHandler(), context.getClass()]);

        const request = context.switchToHttp().getRequest();
        const user: IUserDocument | undefined = request[CURRENT_USER_REQ_KEY];

        const allowedRoles = requiredRoles != null && requiredRoles.length > 0;
        const authorizedUser = user != null && user.role != null;

        if (allowedRoles && authorizedUser) {
            // apply roles guard
            return requiredRoles.some((role) => user.role === role);
        }

        // bypass roles guard
        return true;
    }
}
