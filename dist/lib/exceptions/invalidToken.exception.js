"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidTokenException = void 0;
const common_1 = require("@nestjs/common");
class InvalidTokenException extends common_1.BadRequestException {
    constructor(message) {
        super(message ?? 'Invalid Token');
    }
}
exports.InvalidTokenException = InvalidTokenException;
//# sourceMappingURL=invalidToken.exception.js.map