"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaginatedMongoOptions = void 0;
function createPaginatedMongoOptions(queryParams) {
    const page = queryParams?.page ?? 1;
    const limit = queryParams?.limit ?? 10;
    const skip = (page - 1) * limit;
    if (queryParams)
        delete queryParams.page;
    return { ...queryParams, limit, skip };
}
exports.createPaginatedMongoOptions = createPaginatedMongoOptions;
//# sourceMappingURL=create-paginated-params.util.js.map