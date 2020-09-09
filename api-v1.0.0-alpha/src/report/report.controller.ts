import { Controller, Post, Param, Body, Req, HttpCode, UseGuards, UseFilters } from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportReplyParamDto, CreateReportReplyBodyDto, CreateReportCommentParamDto, CreateReportCommentBodyDto } from './report.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { QueryFailedExceptionFilter } from './http-exception.filter';

@Controller('report')
export class ReportController {

  constructor( private readonly reportService: ReportService ) {  };

  @Post('reply/:reply_id')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  @UseFilters(QueryFailedExceptionFilter)
  createReportReply(@Param() params: CreateReportReplyParamDto, @Body() body: CreateReportReplyBodyDto, @Req() request) {
    return this.reportService.createReportReply(params.reply_id, body, request.user.user_id);
    // return 'ok'
  };

  @Post('comment/:comment_id') 
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  @UseFilters(QueryFailedExceptionFilter)
  createReportComment(@Param() params: CreateReportCommentParamDto, @Body() body: CreateReportCommentBodyDto, @Req() request) {
    return this.reportService.createReportComment(params.comment_id, body, request.user.user_id);
  };
}
