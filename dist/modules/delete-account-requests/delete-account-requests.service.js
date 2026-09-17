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
exports.DeleteAccountRequestsService = void 0;
const common_1 = require("@nestjs/common");
const delete_account_request_repository_1 = require("./delete-account-request.repository");
let DeleteAccountRequestsService = class DeleteAccountRequestsService {
    constructor(repository) {
        this.repository = repository;
    }
    create(user, createDeleteAccountRequestDto) {
        const deleteRequest = {
            userId: user._id,
            name: user.name,
            email: user.mail,
            reason: createDeleteAccountRequestDto.reason,
        };
        return this.repository.create(deleteRequest);
    }
    findAll() {
        return this.repository.findAll({});
    }
    remove(id) {
        return this.repository.delete({ userId: id });
    }
};
exports.DeleteAccountRequestsService = DeleteAccountRequestsService;
exports.DeleteAccountRequestsService = DeleteAccountRequestsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [delete_account_request_repository_1.DeleteAccountRequestRepository])
], DeleteAccountRequestsService);
//# sourceMappingURL=delete-account-requests.service.js.map