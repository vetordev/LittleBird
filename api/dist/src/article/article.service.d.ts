import { Article } from './entity/article.entity';
import { Repository } from 'typeorm';
import { ThemeArticle } from './entity/theme-article.entity';
import { LikeArticle } from './entity/like-article.entity';
import { Response } from 'express';
import { LaterArticle } from './entity/later-article.entity';
import { Forum } from '../forum/entity/forum.entity';
export declare class ArticleService {
    private readonly articleRepository;
    private readonly themeArticleRepository;
    private readonly likeArticleRepository;
    private readonly laterArticleRepository;
    private readonly forumRepository;
    constructor(articleRepository: Repository<Article>, themeArticleRepository: Repository<ThemeArticle>, likeArticleRepository: Repository<LikeArticle>, laterArticleRepository: Repository<LaterArticle>, forumRepository: Repository<Forum>);
    getArticle(response: Response, article_id: number): Promise<Response | void>;
    getArticlesByLike(page: number): Promise<Article[]>;
    getArticlesByUserLike(user_id: number, page: number): Promise<LikeArticle[]>;
    getArticlesByTheme(response: Response, theme_id: number, page: number): Promise<Response>;
    createArticleLike(user_id: number, article_id: number): Promise<void>;
    deleteArticleLike(response: Response, user_id: number, article_id: number): Promise<Response | void>;
    createArticleLater(user_id: number, article_id: number): Promise<void>;
    deleteArticleLater(response: Response, user_id: number, article_id: number): Promise<Response | void>;
    getArticlesAndForuns(page: number): Promise<any>;
}
