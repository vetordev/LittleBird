import { Controller, Param, Get, Res, Req, Post, Delete, HttpCode, UseGuards, UseFilters } from '@nestjs/common';
import { ArticleService } from './article.service';
import { GetArticleDto, GetArticlesByThemeDto, CreateArticleLikeDto, DeleteArticleLikeDto } from './article.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { QueryFailedExceptionFilter } from './http-exception.filter';

@Controller('article')
export class ArticleController {

  constructor(private readonly articleService: ArticleService) {}

  @Get(':article_id')
  getArticle(@Res() response, @Param() params: GetArticleDto) {
    return this.articleService.getArticle(response, params.article_id);

  }

  @Get()
  @HttpCode(200)
  getArticleByLike() {
    return this.articleService.getArticlesByLike();
  }

  @Get('user/like')
  @UseGuards(JwtAuthGuard)
  getArticlesByUserLike(@Req() request) {
    return this.articleService.getArticlesByUserLike(request.user.user_id);
  }

  @Get('theme/:theme_id/like')
  getArticlesByTheme(@Res() response, @Param() params: GetArticlesByThemeDto) {
    return this.articleService.getArticlesByTheme(response, params.theme_id);
  }

  @Post(':article_id/like')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  @UseFilters(QueryFailedExceptionFilter)
  createArticleLike(@Req() request, @Param() params: CreateArticleLikeDto) {
    return this.articleService.createArticleLike(request.user.user_id, params.article_id);
  }

  @Delete(':article_id/like')
  @UseGuards(JwtAuthGuard)
  deleteArticleLike(@Res() response, @Req() request, @Param() params: DeleteArticleLikeDto) {
    return this.articleService.deleteArticleLike(response, request.user.user_id, params.article_id);
  }

}
