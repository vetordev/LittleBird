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
exports.HandleLeaveForumDto = exports.HandleJoinForumDto = exports.QueryPageDto = exports.RemoveLikeDto = exports.CreateLikeDto = exports.CreateCommentBodyDto = exports.CreateCommentParamDto = exports.GetForumAndCommentDto = exports.GetForumByThemeDto = exports.RemoveCommentDto = void 0;
const class_validator_1 = require("class-validator");
class RemoveCommentDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], RemoveCommentDto.prototype, "comment_id", void 0);
exports.RemoveCommentDto = RemoveCommentDto;
;
class GetForumByThemeDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], GetForumByThemeDto.prototype, "theme_id", void 0);
exports.GetForumByThemeDto = GetForumByThemeDto;
;
class GetForumAndCommentDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], GetForumAndCommentDto.prototype, "forum_id", void 0);
exports.GetForumAndCommentDto = GetForumAndCommentDto;
;
class CreateCommentParamDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CreateCommentParamDto.prototype, "forum_id", void 0);
exports.CreateCommentParamDto = CreateCommentParamDto;
;
class CreateCommentBodyDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateCommentBodyDto.prototype, "comment_content", void 0);
exports.CreateCommentBodyDto = CreateCommentBodyDto;
;
class CreateLikeDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CreateLikeDto.prototype, "forum_id", void 0);
exports.CreateLikeDto = CreateLikeDto;
;
class RemoveLikeDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], RemoveLikeDto.prototype, "forum_id", void 0);
exports.RemoveLikeDto = RemoveLikeDto;
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
class HandleJoinForumDto {
}
exports.HandleJoinForumDto = HandleJoinForumDto;
;
class HandleLeaveForumDto {
}
exports.HandleLeaveForumDto = HandleLeaveForumDto;
;
//# sourceMappingURL=forum.dto.js.map