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
exports.ReportService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const report_comment_entity_1 = require("./entity/report-comment.entity");
const report_reply_entity_1 = require("./entity/report-reply.entity");
let ReportService = class ReportService {
    constructor(reportCommentRepository, reportReplyRepository) {
        this.reportCommentRepository = reportCommentRepository;
        this.reportReplyRepository = reportReplyRepository;
    }
    async createReportReply(reply_id, report, user_id) {
        await this.reportReplyRepository.createQueryBuilder('report_reply')
            .insert()
            .into('report_reply')
            .values({
            reply_id,
            report_content: report.report_content,
            report_type: report.report_type,
            reporter_user_id: user_id
        })
            .execute();
    }
    ;
    async createReportComment(comment_id, report, user_id) {
        await this.reportCommentRepository.createQueryBuilder('report_comment')
            .insert()
            .into('report_comment')
            .values({
            comment_id,
            report_content: report.report_content,
            report_type: report.report_type,
            reporter_user_id: user_id
        })
            .execute();
    }
    ;
};
ReportService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(report_comment_entity_1.ReportComment)),
    __param(1, typeorm_2.InjectRepository(report_reply_entity_1.ReportReply)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], ReportService);
exports.ReportService = ReportService;
;
//# sourceMappingURL=report.service.js.map