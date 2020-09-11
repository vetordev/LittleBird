"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForumModule = void 0;
const common_1 = require("@nestjs/common");
const forum_controller_1 = require("./forum.controller");
const forum_service_1 = require("./forum.service");
const typeorm_1 = require("@nestjs/typeorm");
const forum_img_entity_1 = require("./entity/forum-img.entity");
const forum_entity_1 = require("./entity/forum.entity");
const theme_forum_entity_1 = require("./entity/theme-forum.entity");
const like_forum_entity_1 = require("./entity/like-forum.entity");
const comment_module_1 = require("../comment/comment.module");
const forum_gateway_1 = require("./forum.gateway");
const user_module_1 = require("../user/user.module");
let ForumModule = class ForumModule {
};
ForumModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([forum_img_entity_1.ForumImg, forum_entity_1.Forum, theme_forum_entity_1.ThemeForum, like_forum_entity_1.LikeForum]), common_1.forwardRef(() => comment_module_1.CommentModule), user_module_1.UserModule],
        controllers: [forum_controller_1.ForumController],
        providers: [forum_service_1.ForumService, forum_gateway_1.ForumGateway],
        exports: [typeorm_1.TypeOrmModule, forum_gateway_1.ForumGateway]
    })
], ForumModule);
exports.ForumModule = ForumModule;
//# sourceMappingURL=forum.module.js.map