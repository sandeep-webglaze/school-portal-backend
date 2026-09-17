"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppSecurityLoader = void 0;
const helmet_1 = require("helmet");
function AppSecurityLoader(app) {
    app.use((0, helmet_1.default)({ crossOriginResourcePolicy: false }));
    app.getHttpAdapter().getInstance().set('etag', false);
}
exports.AppSecurityLoader = AppSecurityLoader;
//# sourceMappingURL=app_security.loader.js.map