import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entity/article.entity';
import { LikeArticle } from './entity/like-article.entity';
import { ThemeArticle } from './entity/theme-article.entity';
import { ArticleImg } from './entity/article-img.entity';
import { LaterArticle } from "./entity/later-article.entity";
import { ForumModule } from '../forum/forum.module';
import { RecommendationArticle } from './entity/recommendation-article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ Article, LikeArticle, ThemeArticle, ArticleImg, LaterArticle, RecommendationArticle ]), ForumModule],
  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule {}
