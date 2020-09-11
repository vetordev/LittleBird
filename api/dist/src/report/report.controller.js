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
exports.ReportController = void 0;
const common_1 = require("@nestjs/common");
const report_service_1 = require("./report.service");
const report_dto_1 = require("./report.dto");
const jwt_auth_guard_1 = require("../auth/jwt/jwt-auth.guard");
const http_exception_filter_1 = require("./http-exception.filter");
let ReportController = class ReportController {
    constructor(reportService) {
        this.reportService = reportService;
    }
    ;
    createReportReply(params, body, request) {
        return this.reportService.createReportReply(params.reply_id, body, request.user.user_id);
    }
    ;
    createReportComment(params, body, request) {
        return this.reportService.createReportComment(params.comment_id, body, request.user.user_id);
    }
    ;
};
__decorate([
    common_1.Post('reply/:reply_id'),
    common_1.HttpCode(204),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.UseFilters(http_exception_filter_1.QueryFailedExceptionFilter),
    __param(0, common_1.Param()), __param(1, common_1.Body()), __param(2, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_dto_1.CreateReportReplyParamDto, report_dto_1.CreateReportReplyBodyDto, Object]),
    __metadata("design:returntype", void 0)
], ReportController.prototype, "createReportReply", null);
__decorate([
    common_1.Post('comment/:comment_id'),
    common_1.HttpCode(204),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.UseFilters(http_exception_filter_1.QueryFailedExceptionFilter),
    __param(0, common_1.Param()), __param(1, common_1.Body()), __param(2, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_dto_1.CreateReportCommentParamDto, report_dto_1.CreateReportCommentBodyDto, Object]),
    __metadata("design:returntype", void 0)
], ReportController.prototype, "createReportComment", null);
ReportController = __decorate([
    common_1.Controller('report'),
    __metadata("design:paramtypes", [report_service_1.ReportService])
], ReportController);
exports.ReportController = ReportController;
//# sourceMappingURL=report.controller.js.map