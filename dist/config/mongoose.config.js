"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
(0, mongoose_2.set)('toJSON', { getters: true });
(0, mongoose_2.set)('toObject', { getters: true });
exports.default = mongoose_1.MongooseModule.forRootAsync({
    imports: [config_1.ConfigModule],
    useFactory: async (configService) => ({
        uri: configService.get('MONGO_URI'),
    }),
    inject: [config_1.ConfigService],
});
//# sourceMappingURL=mongoose.config.js.map