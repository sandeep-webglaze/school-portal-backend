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
exports.FacilityService = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("../../../lib/utils");
const upload_service_1 = require("../../upload/upload.service");
const facility_repository_1 = require("../repositories/facility.repository");
let FacilityService = class FacilityService {
    constructor(repository, uploadService) {
        this.repository = repository;
        this.uploadService = uploadService;
    }
    create(createFacilityDto) {
        return this.repository.create(createFacilityDto);
    }
    findAll(filterDto) {
        const { limit, skip, ...filter } = (0, utils_1.createPaginatedMongoOptions)(filterDto);
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
    update(id, updateFacilityDto) {
        return this.repository.updateById(id, updateFacilityDto);
    }
    async remove(id) {
        const res = await this.repository.deleteById(id);
        if (res._id != null) {
            await this.uploadService.checkAndRemoveOldFile(res.icon);
        }
        return res;
    }
};
exports.FacilityService = FacilityService;
exports.FacilityService = FacilityService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [facility_repository_1.FacilityRepository,
        upload_service_1.UploadService])
], FacilityService);
//# sourceMappingURL=facility.service.js.map