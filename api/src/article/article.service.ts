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
import { RecommendationArticle } from './entity/recommendation-article.entity';

@Injectable()
export class ArticleService {

  constructor(
    @InjectRepository(Article) private readonly articleRepository: Repository<Article>,
    @InjectRepository(ThemeArticle) private readonly themeArticleRepository: Repository<ThemeArticle>,
    @InjectRepository(RecommendationArticle) private readonly recommendationArticleRepository: Repository<RecommendationArticle>,
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

    let themes: any[] = await this.themeArticleRepository.createQueryBuilder('theme_article')
      .select(['theme_article.theme_id', 'theme'])
      .innerJoin('theme_article.theme_id', 'theme')
      .where('theme_article.article_id = :article_id', { article_id })
      .getMany();

    themes = themes.map((theme) => {
      delete theme.theme_article_id
      delete theme.article_id
      delete theme.theme_id.theme_img_id

      return theme.theme_id;
    });

    let recommendations: any[] = await this.recommendationArticleRepository.createQueryBuilder('recommendation_article')
      .select(['recommendation_article.recommendation_id', 'recommendation_article.recommendation_url', 'recommendation_article.recommendation_type', 'recommendation_article.title'])
      .where('recommendation_article.article_id = :article_id', { article_id })
      .getMany();

    const theme_article_recommendation = {
      article,
      themes,
      recommendations
    }

    return response.status(200).json(theme_article_recommendation);
  }

  async getArticlesByLike(response: Response, page: number): Promise<Response> {
    const articles = await this.articleRepository.createQueryBuilder('article')
      .select(['article.article_id', 'article.title', 'article.no_like', 'article.publi_date', 'article_img'])
      .innerJoin('article.article_img_id', 'article_img')
      .orderBy('article.no_like', 'ASC')
      .offset((page - 1) * 6)
      .limit(6)
      .getManyAndCount();

    const count = articles[1];
    let pageCount;

    if (count % 6 == 0){
      pageCount = count / 6;
    }
    else {
      const rest = count % 6;
      pageCount = ((count - rest) / 6) + 1
    }

    return response.status(200).header('x-total-count', pageCount).json(articles[0]);
  }

  async getArticlesByUserLike(response: Response, user_id: number, page: number): Promise<Response> {
    let articles: any = await this.likeArticleRepository.createQueryBuilder('like_article')
      .select(['like_article', 'article.article_id', 'article.title', 'article.no_like', 'article.publi_date', 'article_img'])
      .innerJoin('like_article.article_id', 'article')
      .innerJoin('article.article_img_id', 'article_img')
      .where('like_article.user_id = :user_id', { user_id })
      .orderBy('article.no_like', 'ASC')
      .offset((page - 1) * 6)
      .limit(6)
      .getManyAndCount();

    const count = articles[1];
    let pageCount;

    if (count % 6 == 0){
      pageCount = count / 6;
    }
    else {
      const rest = count % 6;
      pageCount = ((count - rest) / 6) + 1
    }

    articles = articles[0].map((article) => {
      delete article.like_article_id;
      delete article.user_id;

      return article;
    });

    return response.status(200).header('x-total-count', pageCount).json(articles);
  }

  async getArticlesByUserLater(response: Response, user_id: number, page: number): Promise<Response> {
    let articles: any = await this.laterArticleRepository.createQueryBuilder('later_article')
      .select(['later_article', 'article.article_id', 'article.title', 'article.no_like', 'article.publi_date', 'article_img'])
      .innerJoin('later_article.article_id', 'article')
      .innerJoin('article.article_img_id', 'article_img')
      .where('later_article.user_id = :user_id', { user_id })
      .orderBy('article.no_like', 'ASC')
      .offset((page - 1) * 6)
      .limit(6)
      .getManyAndCount();

    const count = articles[1];
    let pageCount;

    if (count % 6 == 0){
      pageCount = count / 6;
    }
    else {
      const rest = count % 6;
      pageCount = ((count - rest) / 6) + 1
    }

    articles = articles[0].map((article) => {
      delete article.later_article_id;
      delete article.user_id;

      return article;
    });

    return response.status(200).header('x-total-count', pageCount).json(articles);
  };

  async getArticlesByTheme(response: Response, theme_id: number, page: number): Promise<Response> {

    const theme = await this.themeArticleRepository.createQueryBuilder('theme_article')
      .select(['theme_article.theme_id'])
      .where('theme_article.theme_id = :theme_id', { theme_id })
      .getOne();

    if (!theme) {
      return response.status(404).json({ error: 'Tema não existe no servidor ou não possui nenhum artigo.' });
    }

    let articles: any = await this.themeArticleRepository.createQueryBuilder('theme_article')
      .select(['theme_article', 'article.article_id', 'article.title', 'article.no_like', 'article.publi_date', 'article_img'])
      .innerJoin('theme_article.article_id', 'article')
      .innerJoin('article.article_img_id', 'article_img')
      .where('theme_article.theme_id = :theme_id', { theme_id })
      .orderBy('article.no_like', 'ASC')
      .offset((page - 1) * 6)
      .limit(6)
      .getManyAndCount();

    const count = articles[1];
    let pageCount;

    if (count % 6 == 0){
      pageCount = count / 6;
    }
    else {
      const rest = count % 6;
      pageCount = ((count - rest) / 6) + 1
    }

    articles = articles[0].map((article) => {
      delete article.theme_id;
      delete article.theme_article_id;

      return article.article_id;
    });

    return response.status(200).header('x-total-count', pageCount).json(articles);
  };

  async getArticlesAndForuns(page: number): Promise<any> {

    const articles: any[] = await this.articleRepository.createQueryBuilder('article')
      .select(['article.article_id', 'article.title', 'article.no_like', 'article.publi_date', 'article_img'])
      .innerJoin('article.article_img_id', 'article_img')
      .limit(3)
      .offset((page - 1) * 3)
      .orderBy('article.publi_date', 'ASC')
      .getMany();

    const foruns: any[] = await this.forumRepository.createQueryBuilder('forum')
      .select(['forum.forum_id', 'forum.title', 'forum.no_like', 'forum.publi_date','forum_img'])
      .innerJoin('forum.forum_img_id', 'forum_img')
      .limit(3)
      .offset((page - 1) * 3)
      .getMany();


    const articles_foruns = articles.concat(foruns)
    articles_foruns.sort(orderByDate);

    return articles_foruns

  }

  // TODO Adicionar verificação antes de inserir o like
  async createArticleLike(response: Response, user_id: number, article_id: number): Promise<Response | void> {

    const article = await this.articleRepository.createQueryBuilder('article')
      .select(['article.article_id'])
      .where('article.article_id = :article_id', { article_id })
      .getOne();

    if(!article) {
      return response.status(404).json({ error: "A chave estrangeira não existe no servidor." });
    }

    const like_article = await this.likeArticleRepository.createQueryBuilder('like_article')
      .select(['like_article.like_article_id'])
      .where('like_article.article_id = :article_id', { article_id })
      .getOne();

    if (!like_article) {
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
    };

    return response.status(204).end();

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

  // TODO Adicionar verificação antes de inserir o later
  async createArticleLater(response: Response, user_id: number, article_id: number): Promise<Response | void> {
    const article = await this.articleRepository.createQueryBuilder('article')
      .select(['article.article_id'])
      .where('article.article_id = :article_id', { article_id })
      .getOne();

    if (!article) {
      return response.status(404).json({ error: 'O artigo não foi encontrado.' });
    }

    const later_article = await this.laterArticleRepository.createQueryBuilder('later_article')
      .select(['later_article.later_article_id'])
      .where('later_article.article_id = :article_id', { article_id })
      .getOne();



    if (!later_article) {
      await this.laterArticleRepository.createQueryBuilder("later_article")
      .insert()
      .into('like_article').values({
        article_id,
        user_id
      }).execute();

    }

    return response.status(204).end();

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
