import { ExecutionContext } from "@nestjs/common";
import { CacheInterceptor } from "@nestjs/cache-manager";
export declare const NoCache: () => import("@nestjs/common").CustomDecorator<string>;
export declare class CachingInterceptor extends CacheInterceptor {
    protected isRequestCacheable(context: ExecutionContext): boolean;
    private extractUserId;
}
