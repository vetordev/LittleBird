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
exports.ArticleController = void 0;
const common_1 = require("@nestjs/common");
const article_service_1 = require("./article.service");
const article_dto_1 = require("./article.dto");
const jwt_auth_guard_1 = require("../auth/jwt/jwt-auth.guard");
const http_exception_filter_1 = require("./http-exception.filter");
let ArticleController = class ArticleController {
    constructor(articleService) {
        this.articleService = articleService;
    }
    getArticle(response, params) {
        return this.articleService.getArticle(response, params.article_id);
    }
    getArticleByLike(query) {
        return this.articleService.getArticlesByLike(query.page);
    }
    getArticlesByUserLike(request, query) {
        return this.articleService.getArticlesByUserLike(request.user.user_id, query.page);
    }
    getArticlesByTheme(response, params, query) {
        return this.articleService.getArticlesByTheme(response, params.theme_id, query.page);
    }
    createArticleLater(request, params) {
        return this.articleService.createArticleLater(request.user.user_id, params.article_id);
    }
    createArticleLike(request, params) {
        return this.articleService.createArticleLike(request.user.user_id, params.article_id);
    }
    deleteArticleLike(response, request, params) {
        return this.articleService.deleteArticleLike(response, request.user.user_id, params.article_id);
    }
    deleteArticleLater(response, request, params) {
        return this.articleService.deleteArticleLater(response, request.user.user_is, params.article_id);
    }
    getArticlesAndForuns(query) {
        return this.articleService.getArticlesAndForuns(query.page);
    }
};
__decorate([
    common_1.Get(':article_id'),
    __param(0, common_1.Res()), __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, article_dto_1.GetArticleDto]),
    __metadata("design:returntype", void 0)
], ArticleController.prototype, "getArticle", null);
__decorate([
    common_1.Get(),
    common_1.HttpCode(200),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [article_dto_1.QueryPageDto]),
    __metadata("design:returntype", void 0)
], ArticleController.prototype, "getArticleByLike", null);
__decorate([
    common_1.Get('user/like'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Req()), __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, article_dto_1.QueryPageDto]),
    __metadata("design:returntype", void 0)
], ArticleController.prototype, "getArticlesByUserLike", null);
__decorate([
    common_1.Get('theme/:theme_id/like'),
    __param(0, common_1.Res()), __param(1, common_1.Param()), __param(2, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, article_dto_1.GetArticlesByThemeDto, article_dto_1.QueryPageDto]),
    __metadata("design:returntype", void 0)
], ArticleController.prototype, "getArticlesByTheme", null);
__decorate([
    common_1.Post(':article_id/later'),
    common_1.HttpCode(204),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.UseFilters(http_exception_filter_1.QueryFailedExceptionFilter),
    __param(0, common_1.Req()), __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, article_dto_1.CreateArticleLaterDto]),
    __metadata("design:returntype", void 0)
], ArticleController.prototype, "createArticleLater", null);
__decorate([
    common_1.Post(':article_id/like'),
    common_1.HttpCode(204),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.UseFilters(http_exception_filter_1.QueryFailedExceptionFilter),
    __param(0, common_1.Req()), __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, article_dto_1.CreateArticleLikeDto]),
    __metadata("design:returntype", void 0)
], ArticleController.prototype, "createArticleLike", null);
__decorate([
    common_1.Delete(':article_id/like'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Res()), __param(1, common_1.Req()), __param(2, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, article_dto_1.DeleteArticleLikeDto]),
    __metadata("design:returntype", void 0)
], ArticleController.prototype, "deleteArticleLike", null);
__decorate([
    common_1.Delete(':article_id/later'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Res()), __param(1, common_1.Req()), __param(2, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, article_dto_1.DeleteArticleLaterDto]),
    __metadata("design:returntype", void 0)
], ArticleController.prototype, "deleteArticleLater", null);
__decorate([
    common_1.Get('forum/date'),
    common_1.HttpCode(200),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [article_dto_1.QueryPageDto]),
    __metadata("design:returntype", void 0)
], ArticleController.prototype, "getArticlesAndForuns", null);
ArticleController = __decorate([
    common_1.Controller('article'),
    __metadata("design:paramtypes", [article_service_1.ArticleService])
], ArticleController);
exports.ArticleController = ArticleController;
//# sourceMappingURL=article.controller.js.map