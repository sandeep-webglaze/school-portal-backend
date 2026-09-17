"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retryWrapper = void 0;
const MAX_RETRIES = 3;
async function exponentialBackoff(retryCount) {
    const delay = Math.pow(2, retryCount) * 1000;
    await new Promise(resolve => setTimeout(resolve, delay));
}
async function retryWrapper(cb, maxTries = MAX_RETRIES) {
    let retryCount = 0;
    while (retryCount < MAX_RETRIES) {
        try {
            return await cb();
        }
        catch (error) {
            retryCount++;
            console.error(`Error updating order transaction. Retrying... (Attempt ${retryCount}/${MAX_RETRIES})`);
            await exponentialBackoff(retryCount);
        }
    }
    throw new Error(`Failed to update order transaction after ${MAX_RETRIES} attempts.`);
}
exports.retryWrapper = retryWrapper;
//# sourceMappingURL=retry-wrapper.util.js.map