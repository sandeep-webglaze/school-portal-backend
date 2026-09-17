import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';
export declare class FirebaseAdmin {
    private configService;
    private readonly app;
    constructor(configService: ConfigService);
    getAuth: () => admin.auth.Auth;
}
