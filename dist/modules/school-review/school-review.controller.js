"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolReviewController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../lib/constants");
const decorators_1 = require("../../lib/decorators");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const school_review_service_1 = require("./school-review.service");
const create_school_review_dto_1 = require("./dto/create-school-review.dto");
const update_school_review_dto_1 = require("./dto/update-school-review.dto");
const school_review_filter_dto_1 = require("./dto/school-review-filter.dto");
let SchoolReviewController = class SchoolReviewController {
    constructor(schoolReviewService) {
        this.schoolReviewService = schoolReviewService;
    }
    create(user, createSchoolReviewDto) {
        return this.schoolReviewService.create(user._id, createSchoolReviewDto);
    }
    findAll(user, filter) {
        if (user.role === constants_1.USER_ROLE.USER)
            filter.user = user._id.toString();
        return this.schoolReviewService.findAll(filter);
    }
    schoolReviews(schoolId, filter) {
        filter.schoolId = schoolId;
        return this.schoolReviewService.findAll(filter);
    }
    update(user, id, updateSchoolReviewDto) {
        return this.schoolReviewService.update(id, updateSchoolReviewDto);
    }
    remove(user, id) {
        return this.schoolReviewService.remove(id);
    }
};
exports.SchoolReviewController = SchoolReviewController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBody)({ type: create_school_review_dto_1.CreateSchoolReviewDto, description: "Json schema for add review to school" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'School Review Added.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, jwt_guard_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_school_review_dto_1.CreateSchoolReviewDto]),
    __metadata("design:returntype", void 0)
], SchoolReviewController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'School Review list.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, jwt_guard_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, school_review_filter_dto_1.SchoolReviewFilterDto]),
    __metadata("design:returntype", void 0)
], SchoolReviewController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiParam)({ type: String, name: "id", description: "School id" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'School Review list.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.Param)('id', decorators_1.ValidateMongoId)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, school_review_filter_dto_1.SchoolReviewFilterDto]),
    __metadata("design:returntype", void 0)
], SchoolReviewController.prototype, "schoolReviews", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiParam)({ type: String, name: "id", description: "Review id" }),
    (0, swagger_1.ApiBody)({ type: update_school_review_dto_1.UpdateSchoolReviewDto, description: "Json schema for updating school review" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Review updated successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, jwt_guard_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', decorators_1.ValidateMongoId)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_school_review_dto_1.UpdateSchoolReviewDto]),
    __metadata("design:returntype", void 0)
], SchoolReviewController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiParam)({ type: String, name: "id", description: "Review id" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'School Review removed.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, jwt_guard_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', decorators_1.ValidateMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], SchoolReviewController.prototype, "remove", null);
exports.SchoolReviewController = SchoolReviewController = __decorate([
    (0, swagger_1.ApiTags)('School Review'),
    (0, common_1.Controller)('school-review'),
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    __metadata("design:paramtypes", [school_review_service_1.SchoolReviewService])
], SchoolReviewController);
//# sourceMappingURL=school-review.controller.js.map