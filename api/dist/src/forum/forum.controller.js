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
exports.ForumController = void 0;
const common_1 = require("@nestjs/common");
const forum_service_1 = require("./forum.service");
const forum_dto_1 = require("./forum.dto");
const jwt_auth_guard_1 = require("../auth/jwt/jwt-auth.guard");
const http_exception_filter_1 = require("./http-exception.filter");
let ForumController = class ForumController {
    constructor(forumService) {
        this.forumService = forumService;
    }
    getForumByTheme(response, params, query) {
        return this.forumService.getForumByTheme(response, params.theme_id, query.page);
    }
    ;
    getForumByLike(query) {
        return this.forumService.getForumByLike(query.page);
    }
    ;
    getForumByUserLike(request, query) {
        return this.forumService.getForumByUserLike(request.user.user_id, query.page);
    }
    ;
    getForumAndComments(response, params, query) {
        return this.forumService.getForumAndComments(response, params.forum_id, query.page);
    }
    ;
    createComment(params, body, request) {
        return this.forumService.createComment(params.forum_id, body.comment_content, request.user.user_id);
    }
    ;
    createLike(params, request) {
        return this.forumService.createLike(params.forum_id, request.user.user_id);
    }
    ;
    removeComment(response, params) {
        return this.forumService.removeComment(response, params.comment_id);
    }
    ;
    removeLike(response, params, request) {
        return this.forumService.removeLike(response, params.forum_id, request.user.user_id);
    }
    ;
};
__decorate([
    common_1.Get('theme/:theme_id/like'),
    common_1.HttpCode(200),
    __param(0, common_1.Res()), __param(1, common_1.Param()), __param(2, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, forum_dto_1.GetForumByThemeDto, forum_dto_1.QueryPageDto]),
    __metadata("design:returntype", void 0)
], ForumController.prototype, "getForumByTheme", null);
__decorate([
    common_1.Get('like'),
    common_1.HttpCode(200),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forum_dto_1.QueryPageDto]),
    __metadata("design:returntype", void 0)
], ForumController.prototype, "getForumByLike", null);
__decorate([
    common_1.Get('user/like'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.HttpCode(200),
    __param(0, common_1.Req()), __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, forum_dto_1.QueryPageDto]),
    __metadata("design:returntype", void 0)
], ForumController.prototype, "getForumByUserLike", null);
__decorate([
    common_1.Get(':forum_id/comment'),
    __param(0, common_1.Res()), __param(1, common_1.Param()), __param(2, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, forum_dto_1.GetForumAndCommentDto, forum_dto_1.QueryPageDto]),
    __metadata("design:returntype", void 0)
], ForumController.prototype, "getForumAndComments", null);
__decorate([
    common_1.Post(':forum_id/comment'),
    common_1.HttpCode(204),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.UseFilters(http_exception_filter_1.QueryFailedExceptionFilter),
    __param(0, common_1.Param()), __param(1, common_1.Body()), __param(2, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forum_dto_1.CreateCommentParamDto, forum_dto_1.CreateCommentBodyDto, Object]),
    __metadata("design:returntype", void 0)
], ForumController.prototype, "createComment", null);
__decorate([
    common_1.Post(':forum_id/like'),
    common_1.HttpCode(204),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.UseFilters(http_exception_filter_1.QueryFailedExceptionFilter),
    __param(0, common_1.Param()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forum_dto_1.CreateLikeDto, Object]),
    __metadata("design:returntype", void 0)
], ForumController.prototype, "createLike", null);
__decorate([
    common_1.Delete('comment/:comment_id'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Res()), __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, forum_dto_1.RemoveCommentDto]),
    __metadata("design:returntype", void 0)
], ForumController.prototype, "removeComment", null);
__decorate([
    common_1.Delete(':forum_id/like'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Res()), __param(1, common_1.Param()), __param(2, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, forum_dto_1.RemoveLikeDto, Object]),
    __metadata("design:returntype", void 0)
], ForumController.prototype, "removeLike", null);
ForumController = __decorate([
    common_1.Controller('forum'),
    __metadata("design:paramtypes", [forum_service_1.ForumService])
], ForumController);
exports.ForumController = ForumController;
//# sourceMappingURL=forum.controller.js.map