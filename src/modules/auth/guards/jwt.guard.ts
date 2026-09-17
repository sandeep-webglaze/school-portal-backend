import { ExecutionContext, Injectable, SetMetadata, createParamDecorator } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { CURRENT_USER_REQ_KEY, IS_PUBLIC_ROUTE } from '@/src/lib/constants';
import { IUser, IUserDocument } from '../../user/interface';

// Decorator for making route public
export const Public = () => SetMetadata(IS_PUBLIC_ROUTE, true);

// Current User Decorator
export const CurrentUser = createParamDecorator((data: keyof IUser, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request[CURRENT_USER_REQ_KEY];
    return data ? user?.[data] : user;
});

@Injectable()
export class JWTAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        //💡 remove Authorization from public routes
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_ROUTE, [context.getHandler(), context.getClass()]);
        if (isPublic) {
            //  See this condition
            return true;
        }
        return super.canActivate(context);
    }
}
