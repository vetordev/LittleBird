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
exports.Theme = void 0;
const typeorm_1 = require("typeorm");
const theme_img_entity_1 = require("./theme-img.entity");
let Theme = class Theme {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Theme.prototype, "theme_id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 100
    }),
    __metadata("design:type", String)
], Theme.prototype, "theme_name", void 0);
__decorate([
    typeorm_1.OneToOne(type => theme_img_entity_1.ThemeImg, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    typeorm_1.JoinColumn({
        name: 'theme_img_id',
        referencedColumnName: 'theme_img_id'
    }),
    typeorm_1.Column({
        type: 'integer',
        unique: true
    }),
    __metadata("design:type", Number)
], Theme.prototype, "theme_img_id", void 0);
Theme = __decorate([
    typeorm_1.Entity('theme')
], Theme);
exports.Theme = Theme;
//# sourceMappingURL=theme.entity.js.map