"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const caching_config_1 = require("../../config/caching.config");
const city_module_1 = require("../city/city.module");
const slug_module_1 = require("../slug/slug.module");
const auth_module_1 = require("../auth/auth.module");
const upload_module_1 = require("../upload/upload.module");
const school_review_module_1 = require("../school-review/school-review.module");
const mails_handler_module_1 = require("../mails-handler/mails-handler.module");
const school_service_1 = require("./services/school.service");
const school_controller_1 = require("./controllers/school.controller");
const facility_controller_1 = require("./controllers/facility.controller");
const school_board_controller_1 = require("./controllers/school-board.controller");
const school_repository_1 = require("./repositories/school.repository");
const facility_service_1 = require("./services/facility.service");
const school_board_service_1 = require("./services/school-board.service");
const school_entity_1 = require("./entities/school.entity");
const school_board_entity_1 = require("./entities/school-board.entity");
const facility_entity_1 = require("./entities/facility.entity");
const school_board_repository_1 = require("./repositories/school-board.repository");
const facility_repository_1 = require("./repositories/facility.repository");
const school_request_controller_1 = require("./controllers/school-request.controller");
const school_request_repository_1 = require("./repositories/school-request.repository");
const school_request_service_1 = require("./services/school-request.service");
const school_request_entity_1 = require("./entities/school-request.entity");
let SchoolModule = class SchoolModule {
};
exports.SchoolModule = SchoolModule;
exports.SchoolModule = SchoolModule = __decorate([
    (0, common_1.Module)({
        controllers: [facility_controller_1.FacilityController, school_board_controller_1.SchoolBoardController, school_controller_1.SchoolController, school_request_controller_1.SchoolRequestController],
        providers: [
            facility_repository_1.FacilityRepository, facility_service_1.FacilityService,
            school_board_repository_1.SchoolBoardRepository, school_board_service_1.SchoolBoardService,
            school_repository_1.SchoolRepository, school_service_1.SchoolService,
            school_request_repository_1.SchoolRequestRepository, school_request_service_1.SchoolRequestService,
        ],
        imports: [
            mongoose_1.MongooseModule.forFeature([school_entity_1.SchoolModel, school_board_entity_1.SchoolBoardModel, facility_entity_1.FacilityModel, school_request_entity_1.SchoolRequestModel]),
            caching_config_1.CachingModule,
            city_module_1.CityModule,
            slug_module_1.SlugModule,
            (0, common_1.forwardRef)(() => school_review_module_1.SchoolReviewModule),
            upload_module_1.UploadModule,
            auth_module_1.AuthModule,
            mails_handler_module_1.MailsHandlerModule
        ],
        exports: [school_service_1.SchoolService, school_board_service_1.SchoolBoardService]
    })
], SchoolModule);
//# sourceMappingURL=school.module.js.map