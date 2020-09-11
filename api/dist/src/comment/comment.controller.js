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
exports.CommentController = void 0;
const common_1 = require("@nestjs/common");
const comment_service_1 = require("./comment.service");
const comment_dto_1 = require("./comment.dto");
const jwt_auth_guard_1 = require("../auth/jwt/jwt-auth.guard");
const http_exception_filter_1 = require("./http-exception.filter");
const comment_dto_2 = require("./comment.dto");
let CommentController = class CommentController {
    constructor(commentService) {
        this.commentService = commentService;
    }
    ;
    getReplies(response, params, query) {
        return this.commentService.getReplies(response, params.comment_id, query.page);
    }
    ;
    getCommentsByForum(response, params, query) {
        return this.commentService.getCommentsByForum(response, params.forum_id, query.page);
    }
    ;
    createLike(response, params) {
        return this.commentService.createLike(response, params.comment_id);
    }
    ;
    createReply(params, body, query, request) {
        return this.commentService.createReply(params.comment_id, body.reply_content, query.forum, request.user.user_id);
    }
    ;
    removeReply(response, params) {
        return this.commentService.removeReply(response, params.reply_id);
    }
    ;
    removeLike(response, params) {
        return this.commentService.removeLike(response, params.comment_id);
    }
    ;
};
__decorate([
    common_1.Get(':comment_id/reply'),
    __param(0, common_1.Res()), __param(1, common_1.Param()), __param(2, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, comment_dto_1.GetRepliesDto, comment_dto_2.QueryPageDto]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "getReplies", null);
__decorate([
    common_1.Get('forum/:forum_id'),
    __param(0, common_1.Res()), __param(1, common_1.Param()), __param(2, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, comment_dto_1.GetCommentsByForumDto, comment_dto_2.QueryPageDto]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "getCommentsByForum", null);
__decorate([
    common_1.Post(':comment_id/like'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Res()), __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, comment_dto_1.CreateLikeDto]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "createLike", null);
__decorate([
    common_1.Post(':comment_id/reply'),
    common_1.HttpCode(204),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.UseFilters(http_exception_filter_1.QueryFailedExceptionFilter),
    __param(0, common_1.Param()), __param(1, common_1.Body()), __param(2, common_1.Query()), __param(3, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comment_dto_1.CreateReplyParamDto, comment_dto_1.CreateReplyBodyDto, comment_dto_1.CreateReplyQueryDto, Object]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "createReply", null);
__decorate([
    common_1.Delete('reply/:reply_id'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Res()), __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, comment_dto_1.RemoveReplyDto]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "removeReply", null);
__decorate([
    common_1.Delete(':comment_id/like'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Res()), __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, comment_dto_1.RemoveLikeDto]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "removeLike", null);
CommentController = __decorate([
    common_1.Controller('comment'),
    __metadata("design:paramtypes", [comment_service_1.CommentService])
], CommentController);
exports.CommentController = CommentController;
//# sourceMappingURL=comment.controller.js.map