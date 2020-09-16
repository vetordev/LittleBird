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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForumService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const forum_entity_1 = require("./entity/forum.entity");
const typeorm_2 = require("typeorm");
const comment_entity_1 = require("../comment/entity/comment.entity");
const theme_forum_entity_1 = require("./entity/theme-forum.entity");
const like_forum_entity_1 = require("./entity/like-forum.entity");
const forum_gateway_1 = require("./forum.gateway");
let ForumService = class ForumService {
    constructor(forumRepository, commentRepository, themeForumRepository, likeForumRepository, forumGateway) {
        this.forumRepository = forumRepository;
        this.commentRepository = commentRepository;
        this.themeForumRepository = themeForumRepository;
        this.likeForumRepository = likeForumRepository;
        this.forumGateway = forumGateway;
    }
    async getForumByTheme(response, theme_id, page) {
        const theme = await this.themeForumRepository.createQueryBuilder('theme_forum')
            .select(['theme_forum.theme_forum_id'])
            .where('theme_forum.theme_id = :theme_id', { theme_id })
            .getOne();
        if (!theme) {
            return response.status(404).json({ error: 'O Tema não existe no servidor ou não possui fóruns.' });
        }
        let foruns = await this.themeForumRepository.createQueryBuilder('theme_forum')
            .select(['theme_forum', 'forum', 'forum_img'])
            .innerJoin('theme_forum.forum_id', 'forum')
            .innerJoin('forum.forum_img_id', 'forum_img')
            .where('theme_forum.theme_id = :theme_id', { theme_id })
            .orderBy('forum.no_like', 'ASC')
            .offset((page - 1) * 6)
            .limit(6)
            .getMany();
        foruns = foruns.map((forum) => {
            delete forum.theme_forum_id;
            delete forum.theme_id;
            return forum.forum_id;
        });
        return response.status(200).json(foruns);
    }
    ;
    async getForumByLike(page) {
        const foruns = await this.forumRepository.createQueryBuilder('forum')
            .select(['forum', 'forum_img'])
            .innerJoin('forum.forum_img_id', 'forum_img')
            .orderBy('forum.no_like', 'ASC')
            .offset((page - 1) * 6)
            .limit(6)
            .getMany();
        return foruns;
    }
    ;
    async getForumByUserLike(user_id, page) {
        let foruns = await this.likeForumRepository.createQueryBuilder('like_forum')
            .select(['like_forum', 'forum', 'forum_img'])
            .innerJoin('like_forum.forum_id', 'forum')
            .innerJoin('forum.forum_img_id', 'forum_img')
            .where('like_forum.user_id = :user_id', { user_id })
            .orderBy('forum.no_like', 'ASC')
            .offset((page - 1) * 6)
            .limit(6)
            .getMany();
        foruns = foruns.map((forum) => {
            delete forum.theme_forum_id;
            delete forum.theme_id;
            return forum.forum_id;
        });
        return foruns;
    }
    ;
    async getForumAndComments(response, forum_id, page) {
        const forum = await this.forumRepository.createQueryBuilder('forum')
            .select(['forum', 'forum_img'])
            .innerJoin('forum.forum_img_id', 'forum_img')
            .where('forum.forum_id = :forum_id', { forum_id })
            .getOne();
        if (!forum) {
            return response.status(404).json({ error: "Forum não encontrado no servidor." });
        }
        ;
        let comments = await this.commentRepository.createQueryBuilder('tb_comment')
            .select(['tb_comment', 'user.user_id', 'user.username', 'user_img'])
            .innerJoin('tb_comment.user_id', 'user')
            .innerJoin('user.user_img_id', 'user_img')
            .where('tb_comment.forum_id = :forum_id', { forum_id })
            .orderBy('tb_comment.comment_id', 'DESC')
            .offset((page - 1) * 6)
            .limit(6)
            .getMany();
        comments = comments.map((comment) => {
            delete comment.forum_id;
            return comment;
        });
        let themes = await this.themeForumRepository.createQueryBuilder('theme_forum')
            .select(['theme_forum', 'theme'])
            .innerJoin('theme_forum.theme_id', 'theme')
            .where('theme_forum.forum_id = :forum_id', { forum_id })
            .getMany();
        themes = themes.map((theme) => {
            delete theme.theme_id.theme_img_id;
            return theme.theme_id;
        });
        const forum_comments_themes = Object.assign(Object.assign({}, forum), { comments,
            themes });
        return response.status(200).json(forum_comments_themes);
    }
    ;
    async createComment(forum_id, comment_content, user_id) {
        const publi_date = new Date().toLocaleDateString();
        const comment = await this.commentRepository.createQueryBuilder('tb_comment')
            .insert()
            .into('tb_comment')
            .values({
            forum_id,
            user_id,
            comment_content,
            publi_date,
            no_like: 0
        })
            .execute();
        await this.forumGateway.handleNewMessage({
            forum_id,
            comment_id: comment.identifiers[0].comment_id,
            comment_content,
            user_id
        });
    }
    ;
    async createLike(forum_id, user_id) {
        await this.likeForumRepository.createQueryBuilder('like_forum')
            .insert()
            .into('like_forum')
            .values({
            forum_id,
            user_id
        })
            .execute();
        const forum = await this.forumRepository.createQueryBuilder('forum')
            .select(['forum.no_like'])
            .where('forum.forum_id = :forum_id', { forum_id })
            .getOne();
        await this.forumRepository.createQueryBuilder('forum')
            .update('forum')
            .set({
            no_like: forum.no_like + 1,
        })
            .where('forum.forum_id = :forum_id', { forum_id })
            .execute();
    }
    ;
    async removeComment(response, comment_id) {
        const comment = await this.commentRepository.createQueryBuilder('tb_comment')
            .select(['tb_comment.comment_id'])
            .where('tb_comment.comment_id = :comment_id', { comment_id })
            .getOne();
        if (!comment) {
            return response.status(404).json({ error: 'Comentário não encontrado no servidor.' });
        }
        await this.commentRepository.createQueryBuilder('tb_comment')
            .delete()
            .where('tb_comment.comment_id = :comment_id', { comment_id })
            .execute();
        return response.status(204).end();
    }
    ;
    async removeLike(response, forum_id, user_id) {
        const like_forum = await this.likeForumRepository.createQueryBuilder('like_forum')
            .select(['like_forum.like_forum_id'])
            .where('like_forum.forum_id = :forum_id', { forum_id })
            .andWhere('like_forum.user_id = :user_id', { user_id })
            .getOne();
        if (!like_forum) {
            return response.status(404).json({ error: 'Like não encontrado no servidor.' });
        }
        await this.likeForumRepository.createQueryBuilder('like_forum')
            .delete()
            .where('like_forum.forum_id = :forum_id', { forum_id })
            .andWhere('like_forum.user_id = :user_id', { user_id })
            .execute();
        const forum = await this.forumRepository.createQueryBuilder('forum')
            .select(['forum.no_like'])
            .where('forum.forum_id = :forum_id', { forum_id })
            .getOne();
        if (forum.no_like > 0) {
            await this.forumRepository.createQueryBuilder('forum')
                .update('forum')
                .set({
                no_like: forum.no_like - 1,
            })
                .where('forum.forum_id = :forum_id', { forum_id })
                .execute();
        }
        return response.status(204).end();
    }
    ;
};
ForumService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(forum_entity_1.Forum)),
    __param(1, typeorm_1.InjectRepository(comment_entity_1.Comment)),
    __param(2, typeorm_1.InjectRepository(theme_forum_entity_1.ThemeForum)),
    __param(3, typeorm_1.InjectRepository(like_forum_entity_1.LikeForum)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        forum_gateway_1.ForumGateway])
], ForumService);
exports.ForumService = ForumService;
//# sourceMappingURL=forum.service.js.map