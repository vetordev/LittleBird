import { Controller, Get, Res, Param, Post, Req, UseGuards, HttpCode, Body, Delete, UseFilters, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { GetRepliesDto, CreateLikeDto, CreateReplyParamDto, CreateReplyBodyDto, RemoveReplyDto, RemoveLikeDto, GetCommentsByForumDto, CreateReplyQueryDto, QueryPageDto } from './comment.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { QueryFailedExceptionFilter } from './http-exception.filter';

@Controller('comment')
export class CommentController {

  constructor (private readonly commentService: CommentService) {};

  @Get(':comment_id/reply')
  getReplies(@Res() response, @Param() params: GetRepliesDto, @Query() query: QueryPageDto) {
    return this.commentService.getReplies(response, params.comment_id, query.page, query.lastMessage);
  };

  @Get('forum/:forum_id')
  getCommentsByForum(@Res() response, @Param() params: GetCommentsByForumDto, @Query() query: QueryPageDto) {
    return this.commentService.getCommentsByForum(response, params.forum_id, query.page, query.lastMessage);
  };

  @Post(':comment_id/like')
  @UseGuards(JwtAuthGuard)
  @UseFilters(QueryFailedExceptionFilter)
  createLike(@Res() response, @Req() request, @Param() params: CreateLikeDto)  {
    return this.commentService.createLike(response, request.user.user_id, params.comment_id);
  };

  @Post(':comment_id/reply')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  @UseFilters(QueryFailedExceptionFilter)
  createReply(@Param() params: CreateReplyParamDto, @Body() body: CreateReplyBodyDto, @Query() query: CreateReplyQueryDto, @Req() request) {
    return this.commentService.createReply(params.comment_id, body.reply_content, query.forum, request.user.user_id)
  };

  @Delete('reply/:reply_id')
  @UseGuards(JwtAuthGuard)
  removeReply(@Res() response, @Param() params: RemoveReplyDto) {
    return this.commentService.removeReply(response, params.reply_id);
  };

  @Delete(':comment_id/like')
  @UseGuards(JwtAuthGuard)
  removeLike(@Res() response, @Req() request, @Param() params: RemoveLikeDto) {
    return this.commentService.removeLike(response, request.user.user_id, params.comment_id);
  };
}
