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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleLeaveCommentDto = exports.HandleJoinCommentDto = exports.CreateReplyQueryDto = exports.QueryPageDto = exports.GetCommentsByForumDto = exports.RemoveLikeDto = exports.RemoveReplyDto = exports.CreateReplyBodyDto = exports.CreateReplyParamDto = exports.CreateLikeDto = exports.GetRepliesDto = void 0;
const class_validator_1 = require("class-validator");
class GetRepliesDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], GetRepliesDto.prototype, "comment_id", void 0);
exports.GetRepliesDto = GetRepliesDto;
;
class CreateLikeDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CreateLikeDto.prototype, "comment_id", void 0);
exports.CreateLikeDto = CreateLikeDto;
;
class CreateReplyParamDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CreateReplyParamDto.prototype, "comment_id", void 0);
exports.CreateReplyParamDto = CreateReplyParamDto;
;
class CreateReplyBodyDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateReplyBodyDto.prototype, "reply_content", void 0);
exports.CreateReplyBodyDto = CreateReplyBodyDto;
;
class RemoveReplyDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], RemoveReplyDto.prototype, "reply_id", void 0);
exports.RemoveReplyDto = RemoveReplyDto;
;
class RemoveLikeDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], RemoveLikeDto.prototype, "comment_id", void 0);
exports.RemoveLikeDto = RemoveLikeDto;
;
class GetCommentsByForumDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], GetCommentsByForumDto.prototype, "forum_id", void 0);
exports.GetCommentsByForumDto = GetCommentsByForumDto;
;
class QueryPageDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], QueryPageDto.prototype, "page", void 0);
exports.QueryPageDto = QueryPageDto;
;
class CreateReplyQueryDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateReplyQueryDto.prototype, "forum", void 0);
exports.CreateReplyQueryDto = CreateReplyQueryDto;
class HandleJoinCommentDto {
}
exports.HandleJoinCommentDto = HandleJoinCommentDto;
;
class HandleLeaveCommentDto {
}
exports.HandleLeaveCommentDto = HandleLeaveCommentDto;
;
//# sourceMappingURL=comment.dto.js.map