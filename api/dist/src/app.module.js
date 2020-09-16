"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const theme_module_1 = require("./theme/theme.module");
const interest_module_1 = require("./interest/interest.module");
const connection_1 = require("../config/connection");
const article_module_1 = require("./article/article.module");
const forum_module_1 = require("./forum/forum.module");
const comment_module_1 = require("./comment/comment.module");
const report_module_1 = require("./report/report.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(connection_1.connection),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            theme_module_1.ThemeModule,
            interest_module_1.InterestModule,
            article_module_1.ArticleModule,
            forum_module_1.ForumModule,
            comment_module_1.CommentModule,
            report_module_1.ReportModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map