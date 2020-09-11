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
exports.Article = void 0;
const typeorm_1 = require("typeorm");
const article_img_entity_1 = require("./article-img.entity");
let Article = class Article {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Article.prototype, "article_id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 100
    }),
    __metadata("design:type", String)
], Article.prototype, "title", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 700
    }),
    __metadata("design:type", String)
], Article.prototype, "article_content", void 0);
__decorate([
    typeorm_1.Column({
        type: 'integer',
    }),
    __metadata("design:type", Number)
], Article.prototype, "no_like", void 0);
__decorate([
    typeorm_1.Column({
        type: 'date'
    }),
    __metadata("design:type", String)
], Article.prototype, "publi_date", void 0);
__decorate([
    typeorm_1.OneToOne(type => article_img_entity_1.ArticleImg, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    typeorm_1.JoinColumn({
        name: 'article_img_id',
        referencedColumnName: 'article_img_id'
    }),
    typeorm_1.Column({
        type: 'integer',
    }),
    __metadata("design:type", Number)
], Article.prototype, "article_img_id", void 0);
Article = __decorate([
    typeorm_1.Entity('article')
], Article);
exports.Article = Article;
//# sourceMappingURL=article.entity.js.map