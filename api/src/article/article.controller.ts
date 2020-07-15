import { Controller, Param, Get, Res, Req, Post, ParseArrayPipe, Delete, HttpCode } from '@nestjs/common';
import { ArticleService } from './article.service';
import { GetArticleDto, GetArticlesByThemeDto, CreateArticleLikeDto, DeleteArticleLikeDto } from './article.dto';

@Controller('article')
export class ArticleController {

  constructor(private readonly articleService: ArticleService) {}

  @Get('article_id')
  getArticle(@Res() response, @Param() params: GetArticleDto) {
    return this.articleService.getArticle(response, params.article_id);
  }

  @Get('like')
  @HttpCode(200)
  getArticleByLike() {
    return this.articleService.getArticlesByLike();
  }

  @Get('user/like')
  getArticlesByUserLike(@Req() request) {
    return this.articleService.getArticlesByUserLike(request.user.user_id);
  }

  @Get('theme/:theme_id:/like')
  getArticlesByTheme(@Res() response, @Param() params: GetArticlesByThemeDto) {
    return this.articleService.getArticlesByTheme(response, params.theme_id);
  }

  @Post('article/:article_id/like')
  createArticleLike(@Res() response, @Param() params: CreateArticleLikeDto) {
    return this.articleService.createArticleLike(response, params.article_id);
  }

  @Delete('article/:article_id/like')
  deleteArticleLike(@Res() response, @Param() params: DeleteArticleLikeDto) {
    return this.articleService.deleteArticleLike(response, params.article_id);
  }

}
