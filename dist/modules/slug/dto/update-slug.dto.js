"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSlugDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_slug_dto_1 = require("./create-slug.dto");
class UpdateSlugDto extends (0, swagger_1.PartialType)(create_slug_dto_1.CreateSlugDto) {
}
exports.UpdateSlugDto = UpdateSlugDto;
//# sourceMappingURL=update-slug.dto.js.map