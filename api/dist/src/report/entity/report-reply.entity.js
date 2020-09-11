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
exports.ReportReply = void 0;
const typeorm_1 = require("typeorm");
const reply_entity_1 = require("../../comment/entity/reply.entity");
const user_entity_1 = require("../../user/entity/user.entity");
const report_type_entity_1 = require("./report-type.entity");
let ReportReply = class ReportReply {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ReportReply.prototype, "report_reply_id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 80
    }),
    __metadata("design:type", String)
], ReportReply.prototype, "report_content", void 0);
__decorate([
    typeorm_1.ManyToOne(type => reply_entity_1.Reply, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    typeorm_1.JoinColumn({
        name: 'reply_id',
        referencedColumnName: 'reply_id'
    }),
    typeorm_1.Column({
        type: 'integer'
    }),
    __metadata("design:type", Number)
], ReportReply.prototype, "reply_id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.User, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    typeorm_1.JoinColumn({
        name: 'reporter_user_id',
        referencedColumnName: 'user_id'
    }),
    typeorm_1.Column({
        type: 'integer'
    }),
    __metadata("design:type", Number)
], ReportReply.prototype, "reporter_user_id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => report_type_entity_1.ReportType, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    typeorm_1.JoinColumn({
        name: 'report_type',
        referencedColumnName: 'report_type_id'
    }),
    typeorm_1.Column({
        type: 'integer'
    }),
    __metadata("design:type", Number)
], ReportReply.prototype, "report_type", void 0);
ReportReply = __decorate([
    typeorm_1.Entity('report_reply')
], ReportReply);
exports.ReportReply = ReportReply;
;
//# sourceMappingURL=report-reply.entity.js.map