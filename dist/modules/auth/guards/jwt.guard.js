"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTAuthGuard = exports.CurrentUser = exports.Public = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const passport_1 = require("@nestjs/passport");
const constants_1 = require("../../../lib/constants");
const Public = () => (0, common_1.SetMetadata)(constants_1.IS_PUBLIC_ROUTE, true);
exports.Public = Public;
exports.CurrentUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request[constants_1.CURRENT_USER_REQ_KEY];
    return data ? user?.[data] : user;
});
let JWTAuthGuard = class JWTAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor(reflector) {
        super();
        this.reflector = reflector;
    }
    canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(constants_1.IS_PUBLIC_ROUTE, [context.getHandler(), context.getClass()]);
        if (isPublic) {
            return true;
        }
        return super.canActivate(context);
    }
};
exports.JWTAuthGuard = JWTAuthGuard;
exports.JWTAuthGuard = JWTAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], JWTAuthGuard);
//# sourceMappingURL=jwt.guard.js.map