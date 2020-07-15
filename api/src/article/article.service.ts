import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entity/article.entity';
import { Repository } from 'typeorm';
import { ThemeArticle } from './entity/theme-article.entity';
import { LikeArticle } from './entity/like-article.entity';

@Injectable()
export class ArticleService {

  constructor(
    @InjectRepository(Article) private readonly articleRespository: Repository<Article>,
    @InjectRepository(ThemeArticle) private readonly themeArticleRespository: Repository<ThemeArticle>,
    @InjectRepository(LikeArticle) private readonly likeArticleRespository: Repository<LikeArticle>
  ) {}

  async getArticle(response: Response, article_id: number): Promise<Article> {

  }

  async getArticlesByLike(): Promise<Article[]> {

  }

  async getArticlesByUserLike(user_id: number): Promise<Article[]> {

  }

  async getArticlesByTheme(response: Response, theme_id: number): Promise<Article[]> {

  }

  async createArticleLike(response: Response, article_id: number): Promise<void> {

  }
  async deleteArticleLike(response: Response, article_id: number): Promise<void> {

  }
}
