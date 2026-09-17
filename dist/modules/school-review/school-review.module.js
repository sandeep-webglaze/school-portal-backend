"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolReviewModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const school_module_1 = require("../school/school.module");
const school_review_service_1 = require("./school-review.service");
const school_review_controller_1 = require("./school-review.controller");
const school_review_repository_1 = require("./school-review.repository");
const school_review_entity_1 = require("./entities/school-review.entity");
let SchoolReviewModule = class SchoolReviewModule {
};
exports.SchoolReviewModule = SchoolReviewModule;
exports.SchoolReviewModule = SchoolReviewModule = __decorate([
    (0, common_1.Module)({
        controllers: [school_review_controller_1.SchoolReviewController],
        providers: [school_review_repository_1.SchoolReviewRepository, school_review_service_1.SchoolReviewService],
        imports: [
            mongoose_1.MongooseModule.forFeature([school_review_entity_1.SchoolReviewModel]),
            (0, common_1.forwardRef)(() => school_module_1.SchoolModule)
        ],
        exports: [school_review_service_1.SchoolReviewService]
    })
], SchoolReviewModule);
//# sourceMappingURL=school-review.module.js.map