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
exports.QueryPageDto = exports.GetArticlesAndForunsDto = exports.DeleteArticleLaterDto = exports.CreateArticleLaterDto = exports.CreateArticleLikeDto = exports.DeleteArticleLikeDto = exports.GetArticlesByThemeDto = exports.GetArticleDto = void 0;
const class_validator_1 = require("class-validator");
class GetArticleDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], GetArticleDto.prototype, "article_id", void 0);
exports.GetArticleDto = GetArticleDto;
class GetArticlesByThemeDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], GetArticlesByThemeDto.prototype, "theme_id", void 0);
exports.GetArticlesByThemeDto = GetArticlesByThemeDto;
class DeleteArticleLikeDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], DeleteArticleLikeDto.prototype, "article_id", void 0);
exports.DeleteArticleLikeDto = DeleteArticleLikeDto;
class CreateArticleLikeDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CreateArticleLikeDto.prototype, "article_id", void 0);
exports.CreateArticleLikeDto = CreateArticleLikeDto;
class CreateArticleLaterDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CreateArticleLaterDto.prototype, "article_id", void 0);
exports.CreateArticleLaterDto = CreateArticleLaterDto;
class DeleteArticleLaterDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], DeleteArticleLaterDto.prototype, "article_id", void 0);
exports.DeleteArticleLaterDto = DeleteArticleLaterDto;
class GetArticlesAndForunsDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], GetArticlesAndForunsDto.prototype, "limit", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], GetArticlesAndForunsDto.prototype, "page", void 0);
exports.GetArticlesAndForunsDto = GetArticlesAndForunsDto;
class QueryPageDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], QueryPageDto.prototype, "page", void 0);
exports.QueryPageDto = QueryPageDto;
//# sourceMappingURL=article.dto.js.map