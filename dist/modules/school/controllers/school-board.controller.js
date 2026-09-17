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
exports.SchoolBoardController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../../lib/constants");
const decorators_1 = require("../../../lib/decorators");
const interceptors_1 = require("../../../lib/interceptors");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const jwt_guard_1 = require("../../auth/guards/jwt.guard");
const school_board_dto_1 = require("../dto/school-board.dto");
const school_board_service_1 = require("../services/school-board.service");
let SchoolBoardController = class SchoolBoardController {
    constructor(schoolBoardService) {
        this.schoolBoardService = schoolBoardService;
    }
    create(createSchoolBoardDto) {
        return this.schoolBoardService.create(createSchoolBoardDto);
    }
    findAll(filter) {
        return this.schoolBoardService.findAll(filter);
    }
    findOne(id) {
        return this.schoolBoardService.findOne(id);
    }
    update(id, updateSchoolBoardDto) {
        return this.schoolBoardService.update(id, updateSchoolBoardDto);
    }
    remove(id) {
        return this.schoolBoardService.remove(id);
    }
};
exports.SchoolBoardController = SchoolBoardController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN, constants_1.USER_ROLE.SUB_ADMIN),
    (0, swagger_1.ApiBody)({ type: school_board_dto_1.CreateSchoolBoardDto, description: "Json schema for creating School board" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "School board created successfully" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [school_board_dto_1.CreateSchoolBoardDto]),
    __metadata("design:returntype", void 0)
], SchoolBoardController.prototype, "create", null);
__decorate([
    (0, common_1.UseInterceptors)(interceptors_1.CachingInterceptor),
    (0, jwt_guard_1.Public)(),
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'School board Lists based on applied filters.' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [school_board_dto_1.SchoolBoardFilterDto]),
    __metadata("design:returntype", void 0)
], SchoolBoardController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseInterceptors)(interceptors_1.CachingInterceptor),
    (0, jwt_guard_1.Public)(),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiParam)({ type: String, name: "id", description: "School board id" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'School board Detail.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.Param)('id', decorators_1.ValidateMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SchoolBoardController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN, constants_1.USER_ROLE.SUB_ADMIN),
    (0, swagger_1.ApiParam)({ type: String, name: "id", description: "School board id" }),
    (0, swagger_1.ApiBody)({ type: school_board_dto_1.UpdateSchoolBoardDto, description: "Json schema for updating School board" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'School board Detail.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.Param)('id', decorators_1.ValidateMongoId)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, school_board_dto_1.UpdateSchoolBoardDto]),
    __metadata("design:returntype", void 0)
], SchoolBoardController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN),
    (0, swagger_1.ApiParam)({ type: String, name: "id", description: "School board id" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'School board deleted.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.Param)('id', decorators_1.ValidateMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SchoolBoardController.prototype, "remove", null);
exports.SchoolBoardController = SchoolBoardController = __decorate([
    (0, swagger_1.ApiTags)('School Boards'),
    (0, common_1.Controller)('school-board'),
    __metadata("design:paramtypes", [school_board_service_1.SchoolBoardService])
], SchoolBoardController);
//# sourceMappingURL=school-board.controller.js.map