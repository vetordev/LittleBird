import { Controller, Post, Param, Body, Req, HttpCode } from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportReplyParamDto, CreateReportReplyBodyDto, CreateReportCommentParamDto } from './report.dto';
import { CreateCommentBodyDto } from 'src/forum/forum.dto';

@Controller('report')
export class ReportController {

  constructor( private readonly reportService: ReportService ) {  };

  @Post('reply/:reply_id')
  @HttpCode(204)
  createReportReply(@Param() params: CreateReportReplyParamDto, @Body() body: CreateReportReplyBodyDto, @Req() request) {
    this.reportService.createReportReply(params.reply_id, body, request.user.user_id);
  };

  @Post('comment/:comment_id') 
  @HttpCode(204)
  createReportComment(@Param() params: CreateReportCommentParamDto, @Body() body: CreateCommentBodyDto, @Req() request) {
    this.reportService.createReportComment(params.comment_id, body, request.user.user_id);
  };
}
