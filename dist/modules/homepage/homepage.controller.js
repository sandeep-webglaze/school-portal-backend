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
exports.HomepageController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cache_manager_1 = require("@nestjs/cache-manager");
const constants_1 = require("../../lib/constants");
const interceptors_1 = require("../../lib/interceptors");
const roles_guard_1 = require("../auth/guards/roles.guard");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const homepage_service_1 = require("./homepage.service");
const common_2 = require("@nestjs/common");
const auth_service_1 = require("../auth/auth.service");
let HomepageController = class HomepageController {
    constructor(homepageService, authService) {
        this.homepageService = homepageService;
        this.authService = authService;
    }
    async website(authHeader) {
        let user = null;
        if (authHeader) {
            user = await this.authService.validateUserFromAuthHeader(authHeader);
        }
        return this.homepageService.websiteHomepage(user?._id);
    }
    adminPanel(user) {
        return this.homepageService.adminPanelHomePage(user);
    }
    schoolPanel(user) {
        return this.homepageService.schoolPanelHomePage(user);
    }
    schoolFilters() {
        return this.homepageService.schoolFilters();
    }
};
exports.HomepageController = HomepageController;
__decorate([
    (0, common_1.UseInterceptors)(interceptors_1.CachingInterceptor),
    (0, cache_manager_1.CacheTTL)(15),
    (0, jwt_guard_1.Public)(),
    (0, common_1.Get)(''),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Data for main website homepage.' }),
    __param(0, (0, common_2.Headers)('Authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HomepageController.prototype, "website", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, common_1.Get)('/admin-panel'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN, constants_1.USER_ROLE.SUB_ADMIN),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Data for admin website homepage.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, jwt_guard_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HomepageController.prototype, "adminPanel", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, common_1.Get)('/school-panel'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.SCHOOL_ADMIN),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Data for school admin website homepage.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, jwt_guard_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HomepageController.prototype, "schoolPanel", null);
__decorate([
    (0, common_1.UseInterceptors)(interceptors_1.CachingInterceptor),
    (0, cache_manager_1.CacheTTL)(15),
    (0, jwt_guard_1.Public)(),
    (0, common_1.Get)('school-filters'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Objects of All school filters.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HomepageController.prototype, "schoolFilters", null);
exports.HomepageController = HomepageController = __decorate([
    (0, swagger_1.ApiTags)('Homepage'),
    (0, common_1.Controller)('homepage'),
    __metadata("design:paramtypes", [homepage_service_1.HomepageService, auth_service_1.AuthService])
], HomepageController);
//# sourceMappingURL=homepage.controller.js.map