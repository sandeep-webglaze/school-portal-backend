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
exports.SchoolClassificationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../lib/constants");
const decorators_1 = require("../../lib/decorators");
const interceptors_1 = require("../../lib/interceptors");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const school_classification_service_1 = require("./school-classification.service");
const create_school_classification_dto_1 = require("./dto/create-school-classification.dto");
const update_school_classification_dto_1 = require("./dto/update-school-classification.dto");
const school_classification_filter_dto_1 = require("./dto/school-classification-filter.dto");
let SchoolClassificationController = class SchoolClassificationController {
    constructor(schoolClassificationService) {
        this.schoolClassificationService = schoolClassificationService;
    }
    create(createDto) {
        return this.schoolClassificationService.create(createDto);
    }
    findAll(filter) {
        return this.schoolClassificationService.findAll(filter);
    }
    findOne(id) {
        return this.schoolClassificationService.findOne(id);
    }
    update(id, updateDto) {
        return this.schoolClassificationService.update(id, updateDto);
    }
    remove(id) {
        return this.schoolClassificationService.remove(id);
    }
};
exports.SchoolClassificationController = SchoolClassificationController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN, constants_1.USER_ROLE.SUB_ADMIN),
    (0, swagger_1.ApiBody)({ type: create_school_classification_dto_1.CreateSchoolClassificationDto, description: "Json schema for creating classification" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "Classification added successfully" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_school_classification_dto_1.CreateSchoolClassificationDto]),
    __metadata("design:returntype", void 0)
], SchoolClassificationController.prototype, "create", null);
__decorate([
    (0, common_1.UseInterceptors)(interceptors_1.CachingInterceptor),
    (0, jwt_guard_1.Public)(),
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Classifications List based on applied filters.' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [school_classification_filter_dto_1.SchoolClassificationFilterDto]),
    __metadata("design:returntype", void 0)
], SchoolClassificationController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseInterceptors)(interceptors_1.CachingInterceptor),
    (0, jwt_guard_1.Public)(),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiParam)({ type: String, name: "id", description: "Classification id" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Classification Detail.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.Param)('id', decorators_1.ValidateMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SchoolClassificationController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN, constants_1.USER_ROLE.SUB_ADMIN),
    (0, swagger_1.ApiParam)({ type: String, name: "id", description: "Classification id" }),
    (0, swagger_1.ApiBody)({ type: update_school_classification_dto_1.UpdateSchoolClassificationDto, description: "Json schema for updating classification" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Classification Detail.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.Param)('id', decorators_1.ValidateMongoId)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_school_classification_dto_1.UpdateSchoolClassificationDto]),
    __metadata("design:returntype", void 0)
], SchoolClassificationController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN),
    (0, swagger_1.ApiParam)({ type: String, name: "id", description: "Classification id" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Classification removed successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.Param)('id', decorators_1.ValidateMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SchoolClassificationController.prototype, "remove", null);
exports.SchoolClassificationController = SchoolClassificationController = __decorate([
    (0, swagger_1.ApiTags)('School Classification'),
    (0, common_1.Controller)('school-classification'),
    __metadata("design:paramtypes", [school_classification_service_1.SchoolClassificationService])
], SchoolClassificationController);
//# sourceMappingURL=school-classification.controller.js.map