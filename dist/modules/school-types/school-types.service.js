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
exports.SchoolTypeService = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("../../lib/utils");
const school_type_repository_1 = require("./school-type.repository");
let SchoolTypeService = class SchoolTypeService {
    constructor(repository) {
        this.repository = repository;
    }
    create(createDto) {
        return this.repository.create(createDto);
    }
    findAll(filterDto) {
        const { skip, limit, ...filter } = (0, utils_1.createPaginatedMongoOptions)(filterDto);
        return this.repository.findAll({
            filter: {
                name: filter.name && { $regex: `^${filter.name}`, $options: 'i' },
            },
            options: {
                skip,
                limit
            }
        });
    }
    findOne(id) {
        return this.repository.findById(id);
    }
    update(id, updateDto) {
        return this.repository.updateById(id, updateDto);
    }
    remove(id) {
        return this.repository.deleteById(id);
    }
};
exports.SchoolTypeService = SchoolTypeService;
exports.SchoolTypeService = SchoolTypeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [school_type_repository_1.SchoolTypeRepository])
], SchoolTypeService);
//# sourceMappingURL=school-types.service.js.map