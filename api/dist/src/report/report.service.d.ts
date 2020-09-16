import { Repository } from 'typeorm';
import { CreateReportReplyBodyDto, CreateReportCommentBodyDto } from './report.dto';
import { ReportComment } from './entity/report-comment.entity';
import { ReportReply } from './entity/report-reply.entity';
export declare class ReportService {
    private readonly reportCommentRepository;
    private readonly reportReplyRepository;
    constructor(reportCommentRepository: Repository<ReportComment>, reportReplyRepository: Repository<ReportReply>);
    createReportReply(reply_id: number, report: CreateReportReplyBodyDto, user_id: number): Promise<void>;
    createReportComment(comment_id: number, report: CreateReportCommentBodyDto, user_id: number): Promise<void>;
}
