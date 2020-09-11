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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const user_img_entity_1 = require("./user-img.entity");
let User = class User {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "user_id", void 0);
__decorate([
    typeorm_1.Column({
        unique: true,
        type: 'varchar',
        length: 45
    }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 64
    }),
    __metadata("design:type", String)
], User.prototype, "user_pass", void 0);
__decorate([
    typeorm_1.Column({
        unique: true,
        type: 'varchar',
        length: 100
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({
        type: 'date'
    }),
    __metadata("design:type", Date)
], User.prototype, "born_in", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_img_entity_1.UserImg, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    typeorm_1.JoinColumn({
        name: 'user_img_id',
        referencedColumnName: 'user_img_id'
    }),
    typeorm_1.Column({
        type: 'integer',
        unique: false,
    }),
    __metadata("design:type", Number)
], User.prototype, "user_img_id", void 0);
User = __decorate([
    typeorm_1.Entity('tb_user')
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map