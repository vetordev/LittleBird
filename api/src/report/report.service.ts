import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Comment } from 'src/comment/entity/comment.entity';
import { Reply } from 'src/comment/entity/reply.entity';
import { CreateReportReplyBodyDto } from './report.dto';
import { CreateCommentBodyDto } from 'src/forum/forum.dto';

@Injectable()
export class ReportService {

  constructor(
    private readonly reportCommentRepository: Repository<Comment>,
    private readonly reportReplyRepository: Repository<Reply>
  ) {}

  createReportReply(reply_id: number, report: CreateReportReplyBodyDto, user_id: number) {

  };
  createReportComment(comment_id: number, report: CreateCommentBodyDto, user_id: number) {

  };
};
