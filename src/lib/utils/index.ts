export * from './create-paginated-params.util';
export * from './retry-wrapper.util';

export function removeUndefined(obj: any) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    if (Array.isArray(obj)) {
        // Remove undefined values from arrays
        return obj.filter((item) => item !== undefined);
    }

    // Remove undefined values from objects recursively
    const result = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            const cleanedValue = removeUndefined(value);

            if (cleanedValue !== undefined) {
                result[key] = cleanedValue;
            }
        }
    }

    return Object.keys(result).length > 0 ? result : undefined;
}

export function slugify(text?: string) {
    // Check for undefined or empty string
    if (text == null || text.trim() === '') return text;

    // Remove non alpha numeric characters and replace spaces with dashes and convert to lowercase
    return text
        .trim() // remove unnecessary spaces
        .toLowerCase() // convert to lower case
        .replace(/[^A-Za-z0-9\s]/g, ' ') // replace all non-alpha numeric characters with white-space
        .trim() // trim string if any prefix or suffix spaces exist 
        .replace(/\s+/g, '-'); // replace in between spaces with '-'
}
