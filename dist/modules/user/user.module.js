"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const otp_module_1 = require("../otp/otp.module");
const auth_module_1 = require("../auth/auth.module");
const upload_module_1 = require("../upload/upload.module");
const user_service_1 = require("./user.service");
const user_controller_1 = require("./user.controller");
const user_entity_1 = require("./entities/user.entity");
const user_repository_1 = require("./user.repository");
const wallets_module_1 = require("../wallets/wallets.module");
const shared_1 = require("../../lib/shared");
const mails_handler_module_1 = require("../mails-handler/mails-handler.module");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([user_entity_1.UserModel]),
            upload_module_1.UploadModule,
            otp_module_1.OtpModule,
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            wallets_module_1.WalletsModule,
            mails_handler_module_1.MailsHandlerModule,
        ],
        controllers: [user_controller_1.UserController],
        providers: [user_repository_1.UserRepository, user_service_1.UserService, shared_1.SMSService, shared_1.FirebaseAdmin],
        exports: [user_service_1.UserService],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map