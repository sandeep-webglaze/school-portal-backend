"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const jwt_config_1 = require("../../config/jwt.config");
const passport_1 = require("@nestjs/passport");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const common_1 = require("@nestjs/common");
const caching_config_1 = require("../../config/caching.config");
const otp_module_1 = require("../otp/otp.module");
const user_module_1 = require("../user/user.module");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const roles_guard_1 = require("./guards/roles.guard");
const jwt_guard_1 = require("./guards/jwt.guard");
const facebook_strategy_1 = require("./strategies/facebook.strategy");
const google_strategy_1 = require("./strategies/google.strategy");
const mails_handler_module_1 = require("../mails-handler/mails-handler.module");
const shared_1 = require("../../lib/shared");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        controllers: [auth_controller_1.AuthController],
        exports: [auth_service_1.AuthService],
        providers: [
            auth_service_1.AuthService,
            jwt_strategy_1.JwtStrategy,
            google_strategy_1.GoogleStrategy,
            facebook_strategy_1.FacebookStrategy,
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_guard_1.JWTAuthGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: roles_guard_1.RolesGuard,
            },
            {
                provide: shared_1.SMSService,
                useClass: shared_1.SMSService,
            },
        ],
        imports: [
            caching_config_1.CachingModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.registerAsync(jwt_config_1.jwtConfig),
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            otp_module_1.OtpModule,
            mails_handler_module_1.MailsHandlerModule,
        ],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map