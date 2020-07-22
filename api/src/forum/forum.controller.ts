import { Controller, Res, Param, Get, Req, Post, Body, Delete, UseGuards, HttpCode, UseFilters } from '@nestjs/common';
import { ForumService } from './forum.service';
import { GetForumByThemeDto, GetForumAndCommentDto, CreateLikeDto, CreateCommentParamDto, CreateCommentBodyDto, RemoveCommentDto, RemoveLikeDto } from './forum.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { QueryFailedExceptionFilter } from './http-exception.filter';

@Controller('forum')
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  @Get('theme/:theme_id/like')
  @HttpCode(200)
  getForumByTheme(@Res() response, @Param() params: GetForumByThemeDto) {
    return this.forumService.getForumByTheme(response, params.theme_id);
  };

  @Get('like')
  @HttpCode(200)
  getForumByLike() {
    return this.forumService.getForumByLike();
  };

  @Get('user/like')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  getForumByUserLike(@Req() request) {
    return this.getForumByUserLike(request.user.user_id);
  };

  @Get(':forum_id/comment')
  getForumAndComments(@Res() response, @Param() params: GetForumAndCommentDto) {
    return this.forumService.getForumAndComments(response, params.forum_id);
  };

  @Post(':forum_id/comment')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  @UseFilters(QueryFailedExceptionFilter)
  createComment(@Param() params: CreateCommentParamDto, @Body() body: CreateCommentBodyDto, @Req() request) {
    return this.forumService.createComment(params.forum_id, body.comment_content, request.user.user_id)
  };

  @Post(':forum_id/like')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  @UseFilters(QueryFailedExceptionFilter)
  createLike(@Param() params: CreateLikeDto, @Req() request) {
    return this.forumService.createLike(params.forum_id, request.user.user_id)
  };

  @Delete('comment/:comment_id')
  @UseGuards(JwtAuthGuard)
  removeComment(@Res() response, @Param() params: RemoveCommentDto) {
    return this.forumService.removeComment(response, params.comment_id);
  };

  @Delete(':forum_id/like')
  @UseGuards(JwtAuthGuard)
  removeLike(@Res() response, @Param() params: RemoveLikeDto, @Req() request) {
    return this.forumService.removeLike(response, params.forum_id, request.user.user_id);
  };
}
