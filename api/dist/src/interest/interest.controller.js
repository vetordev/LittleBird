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
exports.InterestController = void 0;
const common_1 = require("@nestjs/common");
const interest_dto_1 = require("./interest.dto");
const interest_service_1 = require("./interest.service");
const jwt_auth_guard_1 = require("../auth/jwt/jwt-auth.guard");
const http_exception_filter_1 = require("./http-exception.filter");
let InterestController = class InterestController {
    constructor(interestService) {
        this.interestService = interestService;
    }
    createInterest(request, body) {
        return this.interestService.createInterest(request.user.user_id, body.theme_id);
    }
    getInterestByUser(request, query) {
        return this.interestService.getInterestByUser(request.user.user_id, query.page);
    }
    deleteInterest(response, params) {
        return this.interestService.deleteInterest(params.interest_id, response);
    }
};
__decorate([
    common_1.Post(),
    common_1.HttpCode(204),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.UseFilters(http_exception_filter_1.QueryFailedExceptionFilter),
    __param(0, common_1.Req()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, interest_dto_1.CreateInterestDto]),
    __metadata("design:returntype", void 0)
], InterestController.prototype, "createInterest", null);
__decorate([
    common_1.Get(),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.HttpCode(200),
    __param(0, common_1.Req()), __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, interest_dto_1.QueryPageDto]),
    __metadata("design:returntype", void 0)
], InterestController.prototype, "getInterestByUser", null);
__decorate([
    common_1.Delete(':interest_id'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Res()), __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, interest_dto_1.DeleteInterestDto]),
    __metadata("design:returntype", void 0)
], InterestController.prototype, "deleteInterest", null);
InterestController = __decorate([
    common_1.Controller('interest'),
    __metadata("design:paramtypes", [interest_service_1.InterestService])
], InterestController);
exports.InterestController = InterestController;
//# sourceMappingURL=interest.controller.js.map