import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateReportReplyBodyDto, CreateReportCommentBodyDto } from './report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportComment } from './entity/report-comment.entity';
import { ReportReply } from './entity/report-reply.entity';


@Injectable()
export class ReportService {

  constructor(
    @InjectRepository(ReportComment) private readonly reportCommentRepository: Repository<ReportComment>,
    @InjectRepository(ReportReply) private readonly reportReplyRepository: Repository<ReportReply>
  ) {}

  async createReportReply(reply_id: number, report: CreateReportReplyBodyDto, user_id: number): Promise<void> {
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
    
  };
  async createReportComment(comment_id: number, report: CreateReportCommentBodyDto, user_id: number): Promise<void> {
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
  };
};
