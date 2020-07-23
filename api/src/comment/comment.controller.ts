import { Controller, Get, Res, Param, Post, Req, UseGuards, HttpCode, Body, Delete, UseFilters } from '@nestjs/common';
import { CommentService } from './comment.service';
import { GetRepliesDto, CreateLikeDto, CreateReplyParamDto, CreateReplyBodyDto, RemoveReplyDto, RemoveLikeDto } from './comment.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { QueryFailedExceptionFilter } from './http-exception.filter';

@Controller('comment')
export class CommentController {

  constructor (private readonly commentService: CommentService) {};

  @Get(':comment_id/reply')
  getReplies(@Res() response, @Param() params: GetRepliesDto) {
    return this.commentService.getReplies(response, params.comment_id);
  };

  @Post(':comment_id/like')
  @UseGuards(JwtAuthGuard)
  createLike(@Res() response, @Param() params: CreateLikeDto)  {
    return this.commentService.createLike(response, params.comment_id);
  };

  @Post(':comment_id/reply')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  @UseFilters(QueryFailedExceptionFilter)
  createReply(@Param() params: CreateReplyParamDto, @Body() body: CreateReplyBodyDto, @Req() request) {
    return this.commentService.createReply(params.comment_id, body.reply_content, request.user.user_id)
  };

  @Delete(':reply_id/reply')
  @UseGuards(JwtAuthGuard)
  removeReply(@Res() response, @Param() params: RemoveReplyDto) {
    return this.commentService.removeReply(response, params.reply_id);
  };

  @Delete(':comment_id/like')
  @UseGuards(JwtAuthGuard)
  removeLike(@Res() response, @Param() params: RemoveLikeDto) {
    return this.commentService.removeLike(response, params.comment_id);
  };
}
