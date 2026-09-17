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
exports.SchoolRequestFilterDto = exports.UpdateSchoolRequestDto = exports.CreateSchoolRequestDto = exports.SchoolChangesDto = void 0;
const mongoose_1 = require("mongoose");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const shared_1 = require("../../../lib/shared");
const constants_1 = require("../../../lib/constants");
const school_dto_1 = require("./school.dto");
class SchoolChangesDto extends (0, swagger_1.OmitType)(school_dto_1.UpdateSchoolDto, [
    'avgAcademicsRating',
    'avgAddmissionRating',
    'avgExtracurriclarRating',
    'avgInfrastructureRating',
    'avgRating',
    'city',
    'slug',
    'isFeatured',
    'published',
]) {
}
exports.SchoolChangesDto = SchoolChangesDto;
class CreateSchoolRequestDto {
}
exports.CreateSchoolRequestDto = CreateSchoolRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, enum: constants_1.SCHOOL_REQUEST_STATUS, example: constants_1.SCHOOL_REQUEST_STATUS.PENDING, default: constants_1.SCHOOL_REQUEST_STATUS.PENDING, description: "status of school request" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(constants_1.SCHOOL_REQUEST_STATUS),
    (0, class_validator_1.Equals)(constants_1.SCHOOL_REQUEST_STATUS.PENDING),
    __metadata("design:type", String)
], CreateSchoolRequestDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: SchoolChangesDto }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => SchoolChangesDto),
    __metadata("design:type", SchoolChangesDto)
], CreateSchoolRequestDto.prototype, "requestedChanges", void 0);
class UpdateSchoolRequestDto extends (0, swagger_1.PartialType)(CreateSchoolRequestDto) {
}
exports.UpdateSchoolRequestDto = UpdateSchoolRequestDto;
class SchoolRequestFilterDto extends shared_1.PaginateParamDto {
}
exports.SchoolRequestFilterDto = SchoolRequestFilterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, enum: constants_1.SCHOOL_REQUEST_STATUS }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(constants_1.SCHOOL_REQUEST_STATUS),
    __metadata("design:type", String)
], SchoolRequestFilterDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, example: new mongoose_1.Types.ObjectId(), description: "id of school" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], SchoolRequestFilterDto.prototype, "school", void 0);
//# sourceMappingURL=school-request.dto.js.map