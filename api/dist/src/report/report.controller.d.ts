import { ReportService } from './report.service';
import { CreateReportReplyParamDto, CreateReportReplyBodyDto, CreateReportCommentParamDto, CreateReportCommentBodyDto } from './report.dto';
export declare class ReportController {
    private readonly reportService;
    constructor(reportService: ReportService);
    createReportReply(params: CreateReportReplyParamDto, body: CreateReportReplyBodyDto, request: any): Promise<void>;
    createReportComment(params: CreateReportCommentParamDto, body: CreateReportCommentBodyDto, request: any): Promise<void>;
}
