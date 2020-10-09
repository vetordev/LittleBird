import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entity/article.entity';
import { Repository } from 'typeorm';
import { ThemeArticle } from './entity/theme-article.entity';
import { LikeArticle } from './entity/like-article.entity';
import { Response } from 'express';
import { LaterArticle } from './entity/later-article.entity';
import { Forum } from '../forum/entity/forum.entity';
import { orderByDate } from "./utils/order.date";

@Injectable()
export class ArticleService {

  constructor(
    @InjectRepository(Article) private readonly articleRepository: Repository<Article>,
    @InjectRepository(ThemeArticle) private readonly themeArticleRepository: Repository<ThemeArticle>,
    @InjectRepository(LikeArticle) private readonly likeArticleRepository: Repository<LikeArticle>,
    @InjectRepository(LaterArticle) private readonly laterArticleRepository: Repository<LaterArticle>,
    @InjectRepository(Forum) private readonly forumRepository: Repository<Forum>
  ) {}

  async getArticle(response: Response, article_id: number): Promise<Response | void> {

    const article = await this.articleRepository.createQueryBuilder('article')
      .select(['article', 'article_img'])
      .innerJoin('article.article_img_id', 'article_img')
      .where('article.article_id = :article_id', { article_id })
      .getOne();

    if (!article) {
      return response.status(404).json({ error: 'Artigo não foi encontrado.' });
    };

    let themes: any = await this.themeArticleRepository.createQueryBuilder('theme_article')
      .select(['theme_article', 'theme'])
      .innerJoin('theme_article.theme_id', 'theme')
      .where('theme_article.article_id = :article_id', { article_id })
      .getMany();

    themes = themes.map((theme) => {
      delete theme.theme_article_id
      delete theme.article_id
      delete theme.theme_id.theme_img_id

      return theme.theme_id;
    });

    const theme_article = {
      article,
      themes
    }

    return response.status(200).json(theme_article);
  }

  async getArticlesByLike(page: number): Promise<Article[]> {
    const articles = await this.articleRepository.createQueryBuilder('article')
      .select(['article.article_id', 'article.title', 'article.no_like', 'article.publi_date', 'article_img'])
      .innerJoin('article.article_img_id', 'article_img')
      .orderBy('article.no_like', 'ASC')
      .offset((page - 1) * 6)
      .limit(6)
      .getMany();

    return articles;
  }

  async getArticlesByUserLike(user_id: number, page: number): Promise<LikeArticle[]> {
    let articles = await this.likeArticleRepository.createQueryBuilder('like_article')
      .select(['like_article', 'article.article_id', 'article.title', 'article.no_like', 'article.publi_date', 'article_img'])
      .innerJoin('like_article.article_id', 'article')
      .innerJoin('article.article_img_id', 'article_img')
      .where('like_article.user_id = :user_id', { user_id })
      .orderBy('article.no_like', 'ASC')
      .offset((page - 1) * 6)
      .limit(6)
      .getMany();

    articles = articles.map((article) => {
      delete article.like_article_id;
      delete article.user_id;

      return article;
    });

    return articles;
  }

  async getArticlesByUserLater(user_id: number, page: number): Promise<LaterArticle[]> {
    let articles = await this.laterArticleRepository.createQueryBuilder('later_article')
      .select(['later_article', 'article.article_id', 'article.title', 'article.no_like', 'article.publi_date', 'article_img'])
      .innerJoin('later_article.article_id', 'article')
      .innerJoin('article.article_img_id', 'article_img')
      .where('later_article.user_id = :user_id', { user_id })
      .orderBy('article.no_like', 'ASC')
      .offset((page - 1) * 6)
      .limit(6)
      .getMany();

    articles = articles.map((article) => {
      delete article.later_article_id;
      delete article.user_id;

      return article;
    });

    return articles;
  };

  async getArticlesByTheme(response: Response, theme_id: number, page: number): Promise<Response> {

    const theme = await this.themeArticleRepository.createQueryBuilder('theme_article')
      .select(['theme_article.theme_id'])
      .where('theme_article.theme_id = :theme_id', { theme_id })
      .getOne();

    if (!theme) {
      return response.status(404).json({ error: 'Tema não existe no servidor ou não possui nenhum artigo.' });
    }

    let articles = await this.themeArticleRepository.createQueryBuilder('theme_article')
      .select(['theme_article', 'article.article_id', 'article.title', 'article.no_like', 'article.publi_date', 'article_img'])
      .innerJoin('theme_article.article_id', 'article')
      .innerJoin('article.article_img_id', 'article_img')
      .where('theme_article.theme_id = :theme_id', { theme_id })
      .orderBy('article.no_like', 'ASC')
      .offset((page - 1) * 6)
      .limit(6)
      .getMany();

    articles = articles.map((article) => {
      delete article.theme_id;
      delete article.theme_article_id;

      return article;
    });

    return response.status(200).json(articles);
  };

  async getArticlesAndForuns(page: number): Promise<any> {

    let articles: any[] = await this.articleRepository.createQueryBuilder('article')
      .select(['article.article_id', 'article.title', 'article.no_like', 'article.publi_date', 'article_img'])
      .innerJoin('article.article_img_id', 'article_img')
      .limit(3)
      .offset((page - 1) * 3)
      .orderBy('article.publi_date', 'ASC')
      .getMany();

    let foruns: any[] = await this.forumRepository.createQueryBuilder('forum')
      .select(['forum', 'forum_img'])
      .innerJoin('forum.forum_img_id', 'forum_img')
      .limit(3)
      .offset((page - 1) * 3)
      .getMany();


    const articles_foruns = articles.concat(foruns)
    articles_foruns.sort(orderByDate);

    return articles_foruns

  }

  async createArticleLike(user_id: number, article_id: number): Promise<void> {

    await this.likeArticleRepository.createQueryBuilder("like_article")
      .insert()
      .into('like_article').values({
        article_id,
        user_id
      }).execute();

    const article: any = await this.articleRepository.createQueryBuilder('article')
    .select(['article.no_like'])
    .where('article.article_id = :article_id', { article_id })
    .getOne();

    await this.articleRepository.createQueryBuilder('article')
      .update('article')
      .set({
        no_like: article.no_like + 1,
      })
      .where('article.article_id = :article_id', { article_id })
      .execute();


  }

  async deleteArticleLike(response: Response, user_id: number, article_id: number): Promise<Response | void> {
    const article = await this.articleRepository.createQueryBuilder('article')
      .select('article.no_like')
      .where('article.article_id = :article_id', { article_id })
      .getOne();

    if (!article) {
      return response.status(404).json({ error: 'O artigo não foi encontrado.' });
    }

    await this.likeArticleRepository.createQueryBuilder('like_article')
      .delete()
      .where('like_article.user_id = :user_id', { user_id })
      .andWhere('like_article.article_id = :article_id', { article_id })
      .execute();

    if (article.no_like > 0) {
      await this.articleRepository.createQueryBuilder('article')
        .update('article')
        .set({
          no_like: article.no_like - 1,
        })
        .where('article.article_id = :article_id', { article_id })
        .execute();
    }

    return response.status(204).end();
  }

  async createArticleLater(user_id: number, article_id: number): Promise<void> {
    await this.laterArticleRepository.createQueryBuilder("later_article")
      .insert()
      .into('like_article').values({
        article_id,
        user_id
      }).execute();
  }

  async deleteArticleLater(response: Response, user_id: number, article_id: number): Promise<Response | void> {
    const article = await this.articleRepository.createQueryBuilder('article')
    .select('article.no_like')
    .where('article.article_id = :article_id', { article_id })
    .getOne();

    if (!article) {
      return response.status(404).json({ error: 'O artigo não foi encontrado.' });
    };

    await this.laterArticleRepository.createQueryBuilder('later_article')
      .delete()
      .where('later_article.user_id = :user_id', { user_id })
      .where('later_article.article_id = :article_id', { article_id })
      .execute();

    return response.status(204).end();
  }


}
