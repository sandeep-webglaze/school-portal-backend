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
exports.SchoolRequestController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../../lib/constants");
const decorators_1 = require("../../../lib/decorators");
const jwt_guard_1 = require("../../auth/guards/jwt.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const school_request_service_1 = require("../services/school-request.service");
const school_request_dto_1 = require("../dto/school-request.dto");
let SchoolRequestController = class SchoolRequestController {
    constructor(schoolRequestService) {
        this.schoolRequestService = schoolRequestService;
    }
    create(user, body) {
        return this.schoolRequestService.create(user.school.toString(), body);
    }
    findAll(user, filter) {
        if (user.role === constants_1.USER_ROLE.SCHOOL_ADMIN)
            filter.school = user.school.toString();
        return this.schoolRequestService.findAll(filter);
    }
    findOne(id) {
        return this.schoolRequestService.findOne(id);
    }
    update(id, updateSchoolDto) {
        return this.schoolRequestService.updateRequest(id, updateSchoolDto);
    }
    remove(id) {
        return this.schoolRequestService.remove(id);
    }
};
exports.SchoolRequestController = SchoolRequestController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.SCHOOL_ADMIN),
    (0, swagger_1.ApiBody)({ type: school_request_dto_1.CreateSchoolRequestDto, description: "Json schema for creating School request" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "School request created successfully" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, jwt_guard_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, school_request_dto_1.CreateSchoolRequestDto]),
    __metadata("design:returntype", void 0)
], SchoolRequestController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.SCHOOL_ADMIN, constants_1.USER_ROLE.ADMIN, constants_1.USER_ROLE.SUB_ADMIN),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'School request Lists based on applied filters.' }),
    __param(0, (0, jwt_guard_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, school_request_dto_1.SchoolRequestFilterDto]),
    __metadata("design:returntype", void 0)
], SchoolRequestController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.SCHOOL_ADMIN, constants_1.USER_ROLE.ADMIN, constants_1.USER_ROLE.SUB_ADMIN),
    (0, swagger_1.ApiParam)({ type: String, name: "id", description: "School request id" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'School request Detail.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.Param)('id', decorators_1.ValidateMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SchoolRequestController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN, constants_1.USER_ROLE.SUB_ADMIN),
    (0, swagger_1.ApiParam)({ type: String, name: "id", description: "School id" }),
    (0, swagger_1.ApiBody)({ type: school_request_dto_1.UpdateSchoolRequestDto, description: "Json schema for updating School request" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'School request update success.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.Param)('id', decorators_1.ValidateMongoId)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, school_request_dto_1.UpdateSchoolRequestDto]),
    __metadata("design:returntype", void 0)
], SchoolRequestController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN),
    (0, swagger_1.ApiParam)({ type: String, name: "id", description: "School request id" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'School request deleted.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.Param)('id', decorators_1.ValidateMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SchoolRequestController.prototype, "remove", null);
exports.SchoolRequestController = SchoolRequestController = __decorate([
    (0, swagger_1.ApiTags)('School Request'),
    (0, common_1.Controller)('school-requests'),
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    __metadata("design:paramtypes", [school_request_service_1.SchoolRequestService])
], SchoolRequestController);
//# sourceMappingURL=school-request.controller.js.map