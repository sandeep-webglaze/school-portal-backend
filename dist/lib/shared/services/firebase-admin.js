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
exports.FirebaseAdmin = void 0;
const admin = require("firebase-admin");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let FirebaseAdmin = class FirebaseAdmin {
    constructor(configService) {
        this.configService = configService;
        this.getAuth = () => this.app.auth();
        const serviceAccount = {
            type: configService.get('FIREBASE_TYPE'),
            project_id: configService.get('FIREBASE_PROJECT_ID'),
            private_key_id: configService.get('FIREBASE_PRIVATE_KEY_ID'),
            private_key: configService
                .get('FIREBASE_PRIVATE_KEY')
                ?.replace(/\\n/g, '\n'),
            client_email: configService.get('FIREBASE_CLIENT_EMAIL'),
            client_id: configService.get('FIREBASE_CLIENT_ID'),
            auth_uri: configService.get('FIREBASE_AUTH_URI'),
            token_uri: configService.get('FIREBASE_TOKEN_URI'),
            auth_provider_x509_cert_url: configService.get('FIREBASE_AUTH_PROVIDER_CERT_URL'),
            client_x509_cert_url: configService.get('FIREBASE_CLIENT_CERT_URL'),
        };
        this.app = admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
    }
};
exports.FirebaseAdmin = FirebaseAdmin;
exports.FirebaseAdmin = FirebaseAdmin = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], FirebaseAdmin);
//# sourceMappingURL=firebase-admin.js.map