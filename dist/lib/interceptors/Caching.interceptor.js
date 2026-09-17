"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CachingInterceptor = exports.NoCache = void 0;
const common_1 = require("@nestjs/common");
const cache_manager_1 = require("@nestjs/cache-manager");
const constants_1 = require("../constants");
const NoCache = () => (0, common_1.SetMetadata)(constants_1.IGNORE_CACHING, true);
exports.NoCache = NoCache;
class CachingInterceptor extends cache_manager_1.CacheInterceptor {
    isRequestCacheable(context) {
        const http = context.switchToHttp();
        const request = http.getRequest();
        const ignoreCaching = this.reflector.getAllAndOverride(constants_1.IGNORE_CACHING, [context.getHandler(), context.getClass()]);
        return this.allowedMethods.includes(request.method) && !ignoreCaching;
    }
    extractUserId(request) {
        const user = request[constants_1.CURRENT_USER_REQ_KEY];
        return user?._id?.toString() ?? "";
        ;
    }
}
exports.CachingInterceptor = CachingInterceptor;
//# sourceMappingURL=Caching.interceptor.js.map