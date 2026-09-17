"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoDataFoundException = void 0;
const common_1 = require("@nestjs/common");
class NoDataFoundException extends common_1.NotFoundException {
    constructor(message) {
        super(message ?? 'No Data Found');
    }
}
exports.NoDataFoundException = NoDataFoundException;
//# sourceMappingURL=notfound.exception.js.map