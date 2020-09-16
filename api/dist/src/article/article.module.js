"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleModule = void 0;
const common_1 = require("@nestjs/common");
const article_controller_1 = require("./article.controller");
const article_service_1 = require("./article.service");
const typeorm_1 = require("@nestjs/typeorm");
const article_entity_1 = require("./entity/article.entity");
const like_article_entity_1 = require("./entity/like-article.entity");
const theme_article_entity_1 = require("./entity/theme-article.entity");
const article_img_entity_1 = require("./entity/article-img.entity");
const later_article_entity_1 = require("./entity/later-article.entity");
const forum_module_1 = require("../forum/forum.module");
let ArticleModule = class ArticleModule {
};
ArticleModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([article_entity_1.Article, like_article_entity_1.LikeArticle, theme_article_entity_1.ThemeArticle, article_img_entity_1.ArticleImg, later_article_entity_1.LaterArticle]), forum_module_1.ForumModule],
        controllers: [article_controller_1.ArticleController],
        providers: [article_service_1.ArticleService]
    })
], ArticleModule);
exports.ArticleModule = ArticleModule;
//# sourceMappingURL=article.module.js.map