import { CacheModule } from "@nestjs/cache-manager";

// -----------------------------------------------------------------------------
// Redis DISABLED for now — using the built-in in-memory cache so the app runs
// without a Redis server. To re-enable Redis later, restore the redisStore
// config (cache-manager-redis-store) and set REDIS_HOST / REDIS_PORT.
// -----------------------------------------------------------------------------
export const CachingModule = CacheModule.register({
    isGlobal: true,
    max: 100,
    ttl: 10, // seconds
});
