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
exports.BulkRemoveSchoolEnquiry = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class BulkRemoveSchoolEnquiry {
}
exports.BulkRemoveSchoolEnquiry = BulkRemoveSchoolEnquiry;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, isArray: true, minimum: 1, description: 'id\'s of enquiries to be removed' }),
    (0, class_validator_1.ArrayUnique)(),
    (0, class_validator_1.IsMongoId)({ each: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (!Array.isArray(value))
            return [value];
        return value;
    }),
    __metadata("design:type", Array)
], BulkRemoveSchoolEnquiry.prototype, "ids", void 0);
//# sourceMappingURL=delete-school-enquiry.dto.js.map