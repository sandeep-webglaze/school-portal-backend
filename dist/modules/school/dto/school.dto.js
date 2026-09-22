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
exports.UpdateFeaturedSchoolsPriorityDto = exports.FeaturedSchoolPriorityDto = exports.UpdateSchoolDto = exports.CreateSchoolDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const utils_1 = require("../../../lib/utils");
const mongoose_1 = require("mongoose");
class CreateSchoolDto {
    constructor() {
        this.avgRating = 0;
        this.avgAcademicsRating = 0;
        this.avgInfrastructureRating = 0;
        this.avgAddmissionRating = 0;
        this.avgExtracurriclarRating = 0;
    }
}
exports.CreateSchoolDto = CreateSchoolDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, example: "Apex school", description: "name of the school" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSchoolDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, example: "dr. alex will" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSchoolDto.prototype, "chairman", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: Number, minimum: 1500, maximum: 3000, example: 1990, description: "year of establishment of school" }),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Min)(1500),
    (0, class_validator_1.Max)(3000),
    __metadata("design:type", Number)
], CreateSchoolDto.prototype, "establishmentYear", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, example: "english", description: "Medium of the school" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSchoolDto.prototype, "medium", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, example: new mongoose_1.Types.ObjectId(), description: "id of school classification" }),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateSchoolDto.prototype, "classification", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, example: new mongoose_1.Types.ObjectId(), description: "id of city where school present" }),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateSchoolDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: Number, minimum: 1, example: 5000, description: "Minimum fees of the school" }),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateSchoolDto.prototype, "minFees", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: Number, minimum: 1, example: 10000, description: "Maximum fees of the school" }),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateSchoolDto.prototype, "maxFees", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, example: "March", description: "formatted Date when admission starts at school" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSchoolDto.prototype, "admissionStart", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, example: "April", description: "formatted Date when admission starts at school" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSchoolDto.prototype, "admissionEnd", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, example: "1", description: "starting class which school provide" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSchoolDto.prototype, "classFrom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, example: "12", description: "final class which school offers" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSchoolDto.prototype, "classTo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, example: "1212343455", description: "Contact number of school" }),
    (0, class_validator_1.Matches)(/^\+?[0-9\s()-]{6,20}$/, { message: 'Please enter a valid phone number' }),
    __metadata("design:type", String)
], CreateSchoolDto.prototype, "contactNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, example: "school@mail.com", description: "Contact email of school" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSchoolDto.prototype, "mail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, example: "http://some-school.com/home", description: "Website url of school" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSchoolDto.prototype, "website", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, example: "we the best school in new york", description: "About us text of school" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSchoolDto.prototype, "about", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, isArray: true, example: ["http://images.com/some-school-images"], description: "List of images of schools" }),
    (0, class_validator_1.IsNotEmpty)({ each: true }),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateSchoolDto.prototype, "images", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, isArray: true, example: [new mongoose_1.Types.ObjectId()], description: "Unique list of school type" }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayUnique)(),
    (0, class_validator_1.IsMongoId)({ each: true }),
    __metadata("design:type", Array)
], CreateSchoolDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, isArray: true, example: [new mongoose_1.Types.ObjectId()], description: "Unique list of boards which school provide" }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayUnique)(),
    (0, class_validator_1.IsMongoId)({ each: true }),
    __metadata("design:type", Array)
], CreateSchoolDto.prototype, "schoolBoards", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, isArray: true, example: [new mongoose_1.Types.ObjectId()], description: "Unique list of facilities which school provide" }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayUnique)(),
    (0, class_validator_1.IsMongoId)({ each: true }),
    __metadata("design:type", Array)
], CreateSchoolDto.prototype, "facilities", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: Boolean, default: false, description: "Featured flag for school" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateSchoolDto.prototype, "isFeatured", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: Boolean, default: false, description: "Featured priority of school" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateSchoolDto.prototype, "featuredPriority", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: Boolean, default: false, description: "Published flag for school" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateSchoolDto.prototype, "published", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, example: "some unique school slug", description: "unique slug of school" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(({ value }) => (0, utils_1.slugify)(value)),
    __metadata("design:type", String)
], CreateSchoolDto.prototype, "slug", void 0);
class UpdateSchoolDto extends (0, swagger_1.PartialType)(CreateSchoolDto) {
    constructor() {
        super(...arguments);
        this.removeImageUrls = [];
    }
}
exports.UpdateSchoolDto = UpdateSchoolDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, isArray: true, description: "Urls of school images which are to be removed" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpdateSchoolDto.prototype, "removeImageUrls", void 0);
class FeaturedSchoolPriorityDto {
}
exports.FeaturedSchoolPriorityDto = FeaturedSchoolPriorityDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, example: new mongoose_1.Types.ObjectId(), description: "id of school" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], FeaturedSchoolPriorityDto.prototype, "schoolId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, example: 0, description: "Priority of school" }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], FeaturedSchoolPriorityDto.prototype, "priority", void 0);
class UpdateFeaturedSchoolsPriorityDto {
}
exports.UpdateFeaturedSchoolsPriorityDto = UpdateFeaturedSchoolsPriorityDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, isArray: true, description: "Map of school id with their priorities" }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => FeaturedSchoolPriorityDto),
    __metadata("design:type", Array)
], UpdateFeaturedSchoolsPriorityDto.prototype, "priorities", void 0);
//# sourceMappingURL=school.dto.js.map