"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSchoolTypeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_school_type_dto_1 = require("./create-school-type.dto");
class UpdateSchoolTypeDto extends (0, swagger_1.PartialType)(create_school_type_dto_1.CreateSchoolTypeDto) {
}
exports.UpdateSchoolTypeDto = UpdateSchoolTypeDto;
//# sourceMappingURL=update-school-type.dto.js.map