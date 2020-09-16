"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModule = void 0;
const common_1 = require("@nestjs/common");
const comment_controller_1 = require("./comment.controller");
const comment_service_1 = require("./comment.service");
const typeorm_1 = require("@nestjs/typeorm");
const comment_entity_1 = require("./entity/comment.entity");
const reply_entity_1 = require("./entity/reply.entity");
const forum_module_1 = require("../forum/forum.module");
const comment_gateway_1 = require("./comment.gateway");
const user_module_1 = require("../user/user.module");
let CommentModule = class CommentModule {
};
CommentModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([comment_entity_1.Comment, reply_entity_1.Reply]), common_1.forwardRef(() => forum_module_1.ForumModule), user_module_1.UserModule],
        controllers: [comment_controller_1.CommentController],
        providers: [comment_service_1.CommentService, comment_gateway_1.CommentGateway],
        exports: [typeorm_1.TypeOrmModule]
    })
], CommentModule);
exports.CommentModule = CommentModule;
//# sourceMappingURL=comment.module.js.map