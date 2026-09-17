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
exports.SchoolBoardService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const utils_1 = require("../../../lib/utils");
const school_board_repository_1 = require("../repositories/school-board.repository");
let SchoolBoardService = class SchoolBoardService {
    constructor(connection, repository) {
        this.connection = connection;
        this.repository = repository;
    }
    create(createSchoolBoardDto) {
        return this.repository.create(createSchoolBoardDto);
    }
    findAll(filterDto) {
        const { skip, limit, ...filter } = (0, utils_1.createPaginatedMongoOptions)(filterDto);
        return this.repository.findAll({
            filter: {
                name: filter.name && { $regex: `^${filter.name}`, $options: 'i' },
                featured: filter.featured
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
    update(id, updateSchoolBoardDto) {
        return this.repository.updateById(id, updateSchoolBoardDto);
    }
    remove(id) {
        return this.repository.deleteById(id);
    }
};
exports.SchoolBoardService = SchoolBoardService;
exports.SchoolBoardService = SchoolBoardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectConnection)()),
    __metadata("design:paramtypes", [mongoose_1.Connection,
        school_board_repository_1.SchoolBoardRepository])
], SchoolBoardService);
//# sourceMappingURL=school-board.service.js.map