const MAX_RETRIES = 3;

async function exponentialBackoff(retryCount: number): Promise<void> {
    const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff formula
    await new Promise(resolve => setTimeout(resolve, delay));
}

export async function retryWrapper(cb: CallableFunction, maxTries: number = MAX_RETRIES) {
    let retryCount = 0;
    while (retryCount < MAX_RETRIES) {
        try {
            return await cb(); // Successful execution, exit the loop
        } catch (error) {
            retryCount++;
            console.error(`Error updating order transaction. Retrying... (Attempt ${retryCount}/${MAX_RETRIES})`);
            await exponentialBackoff(retryCount);
        }
    }
    throw new Error(`Failed to update order transaction after ${MAX_RETRIES} attempts.`);
}