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
exports.ThemeArticle = void 0;
const typeorm_1 = require("typeorm");
const article_entity_1 = require("./article.entity");
const theme_entity_1 = require("../../theme/entity/theme.entity");
let ThemeArticle = class ThemeArticle {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ThemeArticle.prototype, "theme_article_id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => article_entity_1.Article, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    typeorm_1.JoinColumn({
        name: 'article_id',
        referencedColumnName: 'article_id'
    }),
    typeorm_1.Column({
        type: 'integer'
    }),
    __metadata("design:type", Number)
], ThemeArticle.prototype, "article_id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => theme_entity_1.Theme, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    typeorm_1.JoinColumn({
        name: 'theme_id',
        referencedColumnName: 'theme_id'
    }),
    typeorm_1.Column({
        type: 'integer'
    }),
    __metadata("design:type", Number)
], ThemeArticle.prototype, "theme_id", void 0);
ThemeArticle = __decorate([
    typeorm_1.Entity('theme_article')
], ThemeArticle);
exports.ThemeArticle = ThemeArticle;
//# sourceMappingURL=theme-article.entity.js.map