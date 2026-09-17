import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FirebaseAdmin {
  private readonly app: admin.app.App;

  constructor(private configService: ConfigService) {
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
      auth_provider_x509_cert_url: configService.get(
        'FIREBASE_AUTH_PROVIDER_CERT_URL',
      ),
      client_x509_cert_url: configService.get('FIREBASE_CLIENT_CERT_URL'),
    } as admin.ServiceAccount;

    this.app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  getAuth = (): admin.auth.Auth => this.app.auth();
}
