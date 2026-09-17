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
exports.SchoolReviewFilterDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const shared_1 = require("../../../lib/shared");
class SchoolReviewFilterDto extends shared_1.PaginateParamDto {
}
exports.SchoolReviewFilterDto = SchoolReviewFilterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: "User id" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], SchoolReviewFilterDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: "School id" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], SchoolReviewFilterDto.prototype, "schoolId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: Number, minimum: 1, maximum: 5, description: "Minimum academic rating" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Max)(5),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], SchoolReviewFilterDto.prototype, "academics", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: Number, minimum: 1, maximum: 5, description: "Minimum infrastructure rating" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Max)(5),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], SchoolReviewFilterDto.prototype, "infrastructure", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: Number, minimum: 1, maximum: 5, description: "Minimum admission rating" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Max)(5),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], SchoolReviewFilterDto.prototype, "addmission", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: Number, minimum: 1, maximum: 5, description: "Minimum extracurricular rating" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Max)(5),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], SchoolReviewFilterDto.prototype, "extracurriclar", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: Number, minimum: 1, maximum: 5, description: "Minimum over all rating" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Max)(5),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], SchoolReviewFilterDto.prototype, "overallRating", void 0);
//# sourceMappingURL=school-review-filter.dto.js.map