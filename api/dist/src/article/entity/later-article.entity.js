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
exports.LaterArticle = void 0;
const typeorm_1 = require("typeorm");
const article_entity_1 = require("./article.entity");
const user_entity_1 = require("../../user/entity/user.entity");
let LaterArticle = class LaterArticle {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], LaterArticle.prototype, "later_article_id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.User, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    typeorm_1.JoinColumn({
        name: 'user_id',
        referencedColumnName: 'user_id'
    }),
    typeorm_1.Column({
        type: 'integer'
    }),
    __metadata("design:type", Number)
], LaterArticle.prototype, "user_id", void 0);
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
], LaterArticle.prototype, "article_id", void 0);
LaterArticle = __decorate([
    typeorm_1.Entity('later_article')
], LaterArticle);
exports.LaterArticle = LaterArticle;
//# sourceMappingURL=later-article.entity.js.map