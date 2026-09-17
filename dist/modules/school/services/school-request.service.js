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
exports.SchoolRequestService = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../lib/constants");
const utils_1 = require("../../../lib/utils");
const school_request_repository_1 = require("../repositories/school-request.repository");
const school_service_1 = require("./school.service");
let SchoolRequestService = class SchoolRequestService {
    constructor(connection, repository, schoolService) {
        this.connection = connection;
        this.repository = repository;
        this.schoolService = schoolService;
    }
    async create(school, createDto) {
        const updateRequest = await this.repository.findOne({ school: school, status: constants_1.SCHOOL_REQUEST_STATUS.PENDING });
        if (updateRequest != null)
            throw new common_1.ConflictException("Request already exists");
        return this.repository.create(createDto);
    }
    async findAll(filterDto) {
        const { skip, limit, ...filter } = (0, utils_1.createPaginatedMongoOptions)(filterDto);
        return this.repository.findAll({
            filter,
            options: {
                skip,
                limit,
                populate: [
                    {
                        path: "school",
                        options: { projection: 'name' },
                    }
                ]
            }
        });
    }
    async findOne(id) {
        return this.repository.findById(id, {
            options: {
                populate: [
                    {
                        path: "school"
                    }
                ]
            }
        });
    }
    async updateRequest(schoolId, updateDto) {
        const transactionSession = await this.connection.startSession();
        transactionSession.startTransaction();
        try {
            const res = await this.repository.updateOne({ school: schoolId, status: constants_1.SCHOOL_REQUEST_STATUS.PENDING }, updateDto);
            if (updateDto.status && updateDto.status === constants_1.SCHOOL_REQUEST_STATUS.ACCEPTED) {
                await this.schoolService.updateSchoolData(schoolId, updateDto.requestedChanges, { session: transactionSession });
            }
            await transactionSession.commitTransaction();
            return res;
        }
        catch (error) {
            await transactionSession.abortTransaction();
            throw error;
        }
        finally {
            transactionSession.endSession();
        }
    }
    async remove(id) {
        return this.repository.deleteById(id);
    }
};
exports.SchoolRequestService = SchoolRequestService;
exports.SchoolRequestService = SchoolRequestService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectConnection)()),
    __metadata("design:paramtypes", [mongoose_1.Connection,
        school_request_repository_1.SchoolRequestRepository,
        school_service_1.SchoolService])
], SchoolRequestService);
//# sourceMappingURL=school-request.service.js.map