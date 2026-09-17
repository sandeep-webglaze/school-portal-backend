import { ExecutionContext, SetMetadata } from "@nestjs/common";
import { CACHE_KEY_METADATA, CacheInterceptor } from "@nestjs/cache-manager";
import { CURRENT_USER_REQ_KEY, IGNORE_CACHING } from "../constants";

export const NoCache = () => SetMetadata(IGNORE_CACHING, true);

export class CachingInterceptor extends CacheInterceptor {
    protected isRequestCacheable(context: ExecutionContext): boolean {
        const http = context.switchToHttp();
        const request = http.getRequest();

        const ignoreCaching: boolean = this.reflector.getAllAndOverride<boolean>(IGNORE_CACHING, [context.getHandler(), context.getClass()]);

        return this.allowedMethods.includes(request.method) && !ignoreCaching;
    }

    // protected trackBy(context: ExecutionContext): string | undefined {
    //     const httpAdapter = this.httpAdapterHost.httpAdapter;
    //     const isHttpApp = httpAdapter && !!httpAdapter.getRequestMethod;
    //     const cacheMetadata = this.reflector.get(
    //         CACHE_KEY_METADATA,
    //         context.getHandler(),
    //     );

    //     if (!isHttpApp || cacheMetadata) {
    //         return cacheMetadata;
    //     }

    //     const request = context.getArgByIndex(0);
    //     if (!this.isRequestCacheable(context)) {
    //         return undefined;
    //     }
    //     const key = this.extractUserId(request) + httpAdapter.getRequestUrl(request);
    //     console.log(key);
    //     return key
    // }

    private extractUserId(request: any): string | undefined {
        // Assuming `req.user` is available in the request object
        const user = request[CURRENT_USER_REQ_KEY];
        return user?._id?.toString() ?? "";;
    }
}
