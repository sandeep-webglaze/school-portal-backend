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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteSchoolService = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("../../lib/utils");
const school_filter_dto_1 = require("../school/dto/school-filter.dto");
const school_service_1 = require("../school/services/school.service");
const favorite_school_repository_1 = require("./favorite-school.repository");
let FavoriteSchoolService = class FavoriteSchoolService {
    constructor(repository, schoolService) {
        this.repository = repository;
        this.schoolService = schoolService;
    }
    create(user, school) {
        return this.repository.create({ user, school });
    }
    async myFavoriteSchools(user, filterDto) {
        const { skip, limit, ...filter } = (0, utils_1.createPaginatedMongoOptions)(filterDto);
        filter.user = user._id.toString();
        const favSchoolMap = await this.repository.findAll({ filter: filter, options: { skip, limit } });
        const schoolFilterDto = new school_filter_dto_1.SchoolFilterDto();
        schoolFilterDto.userId = user._id.toString();
        schoolFilterDto.includeId = favSchoolMap.data.map(fav => fav.school.toString());
        if (schoolFilterDto.includeId.length < 1)
            return { schools: [], totalCount: 0 };
        return this.schoolService.findAll(schoolFilterDto);
    }
    remove(user, school) {
        return this.repository.delete({ user: user._id, school });
    }
};
exports.FavoriteSchoolService = FavoriteSchoolService;
exports.FavoriteSchoolService = FavoriteSchoolService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [favorite_school_repository_1.FavoriteSchoolRepository,
        school_service_1.SchoolService])
], FavoriteSchoolService);
//# sourceMappingURL=favorite-school.service.js.map