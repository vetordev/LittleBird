"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const article_entity_1 = require("./entity/article.entity");
const typeorm_2 = require("typeorm");
const theme_article_entity_1 = require("./entity/theme-article.entity");
const like_article_entity_1 = require("./entity/like-article.entity");
const later_article_entity_1 = require("./entity/later-article.entity");
const forum_entity_1 = require("../forum/entity/forum.entity");
let ArticleService = class ArticleService {
    constructor(articleRepository, themeArticleRepository, likeArticleRepository, laterArticleRepository, forumRepository) {
        this.articleRepository = articleRepository;
        this.themeArticleRepository = themeArticleRepository;
        this.likeArticleRepository = likeArticleRepository;
        this.laterArticleRepository = laterArticleRepository;
        this.forumRepository = forumRepository;
    }
    async getArticle(response, article_id) {
        const article = await this.articleRepository.createQueryBuilder('article')
            .select(['article', 'article_img'])
            .innerJoin('article.article_img_id', 'article_img')
            .where('article.article_id = :article_id', { article_id })
            .getOne();
        if (!article) {
            return response.status(404).json({ error: 'Artigo não foi encontrado.' });
        }
        ;
        let themes = await this.themeArticleRepository.createQueryBuilder('theme_article')
            .select(['theme_article', 'theme'])
            .innerJoin('theme_article.theme_id', 'theme')
            .where('theme_article.article_id = :article_id', { article_id })
            .getMany();
        themes = themes.map((theme) => {
            delete theme.theme_article_id;
            delete theme.article_id;
            delete theme.theme_id.theme_img_id;
            return theme.theme_id;
        });
        const theme_article = {
            article,
            themes
        };
        return response.status(200).json(theme_article);
    }
    async getArticlesByLike(page) {
        const articles = await this.articleRepository.createQueryBuilder('article')
            .select(['article', 'article_img'])
            .innerJoin('article.article_img_id', 'article_img')
            .orderBy('article.no_like', 'ASC')
            .offset((page - 1) * 6)
            .limit(6)
            .getMany();
        return articles;
    }
    async getArticlesByUserLike(user_id, page) {
        let articles = await this.likeArticleRepository.createQueryBuilder('like_article')
            .select(['like_article', 'article', 'article_img'])
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
    async getArticlesByTheme(response, theme_id, page) {
        const theme = await this.themeArticleRepository.createQueryBuilder('theme_article')
            .select(['theme_article.theme_id'])
            .where('theme_article.theme_id = :theme_id', { theme_id })
            .getOne();
        if (!theme) {
            return response.status(404).json({ error: 'Tema não existe no servidor ou não possui nenhum artigo.' });
        }
        let articles = await this.themeArticleRepository.createQueryBuilder('theme_article')
            .select(['theme_article', 'article', 'article_img'])
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
    }
    async createArticleLike(user_id, article_id) {
        await this.likeArticleRepository.createQueryBuilder("like_article")
            .insert()
            .into('like_article').values({
            article_id,
            user_id
        }).execute();
        const article = await this.articleRepository.createQueryBuilder('article')
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
    async deleteArticleLike(response, user_id, article_id) {
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
    async createArticleLater(user_id, article_id) {
        await this.laterArticleRepository.createQueryBuilder("later_article")
            .insert()
            .into('like_article').values({
            article_id,
            user_id
        }).execute();
    }
    async deleteArticleLater(response, user_id, article_id) {
        const article = await this.articleRepository.createQueryBuilder('article')
            .select('article.no_like')
            .where('article.article_id = :article_id', { article_id })
            .getOne();
        if (!article) {
            return response.status(404).json({ error: 'O artigo não foi encontrado.' });
        }
        ;
        await this.laterArticleRepository.createQueryBuilder('later_article')
            .delete()
            .where('later_article.user_id = :user_id', { user_id })
            .where('later_article.article_id = :article_id', { article_id })
            .execute();
        return response.status(204).end();
    }
    async getArticlesAndForuns(page) {
        const articles = await this.articleRepository.createQueryBuilder('article')
            .select(['article', 'article_img'])
            .innerJoin('article.article_img_id', 'article_img')
            .limit(3)
            .offset((page - 1) * 3)
            .orderBy('article.publi_date', 'ASC')
            .getMany();
        const foruns = await this.forumRepository.createQueryBuilder('forum')
            .select(['forum', 'forum_img'])
            .innerJoin('forum.forum_img_id', 'forum_img')
            .limit(3)
            .offset((page - 1) * 3)
            .getMany();
        return {
            articles,
            foruns
        };
    }
};
ArticleService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(article_entity_1.Article)),
    __param(1, typeorm_1.InjectRepository(theme_article_entity_1.ThemeArticle)),
    __param(2, typeorm_1.InjectRepository(like_article_entity_1.LikeArticle)),
    __param(3, typeorm_1.InjectRepository(later_article_entity_1.LaterArticle)),
    __param(4, typeorm_1.InjectRepository(forum_entity_1.Forum)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ArticleService);
exports.ArticleService = ArticleService;
//# sourceMappingURL=article.service.js.map