"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CachingModule = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
exports.CachingModule = cache_manager_1.CacheModule.register({
    isGlobal: true,
    max: 100,
    ttl: 10,
});
//# sourceMappingURL=caching.config.js.map