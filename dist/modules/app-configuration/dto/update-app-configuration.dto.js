"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAppConfigurationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_app_configuration_dto_1 = require("./create-app-configuration.dto");
class UpdateAppConfigurationDto extends (0, swagger_1.PartialType)(create_app_configuration_dto_1.CreateAppConfigurationDto) {
}
exports.UpdateAppConfigurationDto = UpdateAppConfigurationDto;
//# sourceMappingURL=update-app-configuration.dto.js.map