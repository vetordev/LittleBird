import { Controller, Res, Param, Get, Req, Post, Body, Delete, UseGuards, HttpCode, UseFilters, Query } from '@nestjs/common';
import { ForumService } from './forum.service';
import { GetForumByThemeDto, GetForumAndCommentDto, CreateLikeDto, CreateCommentParamDto, CreateCommentBodyDto, RemoveCommentDto, RemoveLikeDto, QueryPageDto } from './forum.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { QueryFailedExceptionFilter } from './http-exception.filter';

@Controller('forum')
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  @Get('theme/:theme_id/like')
  getForumByTheme(@Res() response, @Param() params: GetForumByThemeDto, @Query() query: QueryPageDto) {
    return this.forumService.getForumByTheme(response, params.theme_id, query.page);
  };

  @Get()
  getForumByLike(@Res() response, @Query() query: QueryPageDto) {
    return this.forumService.getForumByLike(response, query.page);
  };

  @Get('user/like')
  @UseGuards(JwtAuthGuard)
  getForumByUserLike(@Res() response, @Req() request, @Query() query: QueryPageDto) {
    return this.forumService.getForumByUserLike(response, request.user.user_id, query.page);
  };

  @Get(':forum_id/comment')
  @UseGuards(JwtAuthGuard)
  getForumAndComments(@Res() response, @Req() request,  @Param() params: GetForumAndCommentDto, @Query() query: QueryPageDto) {
    return this.forumService.getForumAndComments(response, request.user.user_id, params.forum_id, query.page);
  };

  @Post(':forum_id/comment')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  @UseFilters(QueryFailedExceptionFilter)
  createComment(@Param() params: CreateCommentParamDto, @Body() body: CreateCommentBodyDto, @Req() request) {
    return this.forumService.createComment(params.forum_id, body.comment_content, request.user.user_id)
  };

  @Post(':forum_id/like')
  @UseGuards(JwtAuthGuard)
  @UseFilters(QueryFailedExceptionFilter)
  createLike(@Res() response, @Param() params: CreateLikeDto, @Req() request) {
    return this.forumService.createLike(response, params.forum_id, request.user.user_id)
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
