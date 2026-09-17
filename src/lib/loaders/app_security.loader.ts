import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';

export function AppSecurityLoader(app: NestExpressApplication) {

    // -- Helmet
    // `crossOriginResourcePolicy: false` disables the default
    // `Cross-Origin-Resource-Policy: same-origin` header, which otherwise
    // blocks the API response from being read by other origins.
    app.use(helmet({ crossOriginResourcePolicy: false }));

    // removing etag header for the server
    app.getHttpAdapter().getInstance().set('etag', false);
}
