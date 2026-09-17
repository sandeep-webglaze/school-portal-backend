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
exports.CreateSchoolReviewDto = void 0;
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
class CreateSchoolReviewDto {
}
exports.CreateSchoolReviewDto = CreateSchoolReviewDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: String, example: new mongoose_1.Types.ObjectId(), description: "School id" }),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", Object)
], CreateSchoolReviewDto.prototype, "schoolId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: Number, maximum: 5, minimum: 1, description: 'Academics Rating for school' }),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Max)(5),
    __metadata("design:type", Number)
], CreateSchoolReviewDto.prototype, "academics", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: Number, maximum: 5, minimum: 1, description: 'Infrastructure Rating for school' }),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Max)(5),
    __metadata("design:type", Number)
], CreateSchoolReviewDto.prototype, "infrastructure", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: Number, maximum: 5, minimum: 1, description: 'Admission Rating for school' }),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Max)(5),
    __metadata("design:type", Number)
], CreateSchoolReviewDto.prototype, "addmission", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: Number, maximum: 5, minimum: 1, description: 'Extra Curricular Activity Rating for school' }),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Max)(5),
    __metadata("design:type", Number)
], CreateSchoolReviewDto.prototype, "extracurriclar", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: Number, maximum: 5, minimum: 1, description: 'Over All Rating for school' }),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Max)(5),
    __metadata("design:type", Number)
], CreateSchoolReviewDto.prototype, "overallRating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, maximum: 500, minimum: 2, description: 'Review description for school' }),
    (0, class_validator_1.Length)(2, 500),
    __metadata("design:type", String)
], CreateSchoolReviewDto.prototype, "review", void 0);
//# sourceMappingURL=create-school-review.dto.js.map