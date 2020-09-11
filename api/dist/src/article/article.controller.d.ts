/// <reference types="express" />
import { ArticleService } from './article.service';
import { GetArticleDto, GetArticlesByThemeDto, CreateArticleLikeDto, DeleteArticleLikeDto, CreateArticleLaterDto, DeleteArticleLaterDto, QueryPageDto } from './article.dto';
export declare class ArticleController {
    private readonly articleService;
    constructor(articleService: ArticleService);
    getArticle(response: any, params: GetArticleDto): Promise<void | import("express").Response<any>>;
    getArticleByLike(query: QueryPageDto): Promise<import("./entity/article.entity").Article[]>;
    getArticlesByUserLike(request: any, query: QueryPageDto): Promise<import("./entity/like-article.entity").LikeArticle[]>;
    getArticlesByTheme(response: any, params: GetArticlesByThemeDto, query: QueryPageDto): Promise<import("express").Response<any>>;
    createArticleLater(request: any, params: CreateArticleLaterDto): Promise<void>;
    createArticleLike(request: any, params: CreateArticleLikeDto): Promise<void>;
    deleteArticleLike(response: any, request: any, params: DeleteArticleLikeDto): Promise<void | import("express").Response<any>>;
    deleteArticleLater(response: any, request: any, params: DeleteArticleLaterDto): Promise<void | import("express").Response<any>>;
    getArticlesAndForuns(query: QueryPageDto): Promise<any>;
}
