"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
const Log = (options) => (0, common_1.SetMetadata)(constants_1.METHOD_LOG_METADATA, options);
exports.Log = Log;
//# sourceMappingURL=log.decorator.js.map