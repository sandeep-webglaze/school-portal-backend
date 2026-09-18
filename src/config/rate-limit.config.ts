import { ThrottlerModule, seconds } from "@nestjs/throttler";

// -----------------------------------------------------------------------------
// Redis storage DISABLED for now — the throttler uses in-memory storage so the
// app runs without Redis. To re-enable the shared Redis store later, restore
// ThrottlerStorageRedisService with REDIS_HOST / REDIS_PORT.
// -----------------------------------------------------------------------------
export default ThrottlerModule.forRoot([
    {
        name: 'short',
        ttl: seconds(5),
        limit: 10,
    },
    {
        name: 'medium',
        ttl: seconds(30),
        limit: 50,
    },
    {
        name: 'long',
        ttl: seconds(120),
        limit: 200,
    },
]);
