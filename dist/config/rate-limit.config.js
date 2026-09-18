"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const throttler_1 = require("@nestjs/throttler");
exports.default = throttler_1.ThrottlerModule.forRoot([
    {
        name: 'short',
        ttl: (0, throttler_1.seconds)(5),
        limit: 10,
    },
    {
        name: 'medium',
        ttl: (0, throttler_1.seconds)(30),
        limit: 50,
    },
    {
        name: 'long',
        ttl: (0, throttler_1.seconds)(120),
        limit: 200,
    },
]);
//# sourceMappingURL=rate-limit.config.js.map