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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const reply_entity_1 = require("./entity/reply.entity");
const typeorm_2 = require("@nestjs/typeorm");
const comment_entity_1 = require("./entity/comment.entity");
const forum_entity_1 = require("../forum/entity/forum.entity");
const comment_gateway_1 = require("./comment.gateway");
let CommentService = class CommentService {
    constructor(commentRepository, replyRepository, forumRepository, commentGateway) {
        this.commentRepository = commentRepository;
        this.replyRepository = replyRepository;
        this.forumRepository = forumRepository;
        this.commentGateway = commentGateway;
    }
    ;
    async getReplies(response, comment_id, page) {
        const comment = await this.commentRepository.createQueryBuilder('tb_comment')
            .select(['tb_comment.comment_id'])
            .where('tb_comment.comment_id = :comment_id', { comment_id })
            .getOne();
        if (!comment) {
            return response.status(404).json({ error: 'Comentário não encontrado.' });
        }
        const replies = await this.replyRepository.createQueryBuilder('reply')
            .select(['reply', 'user.user_id', 'user.username', 'user_img'])
            .innerJoin('reply.user_id', 'user')
            .innerJoin('user.user_img_id', 'user_img')
            .where('reply.comment_id = :comment_id', { comment_id })
            .offset((page - 1) * 6)
            .limit(6)
            .orderBy('reply.reply_id', 'DESC')
            .getMany();
        return response.status(200).json(replies);
    }
    ;
    async getCommentsByForum(response, forum_id, page) {
        const forum = await this.forumRepository.createQueryBuilder('forum')
            .select(['forum'])
            .where('forum.forum_id = :forum_id', { forum_id })
            .getOne();
        if (!forum) {
            return response.status(404).json({ error: 'Fórum não encontrado.' });
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
        return response.status(200).json(comments);
    }
    ;
    async createLike(response, comment_id) {
        const comment = await this.commentRepository.createQueryBuilder('tb_comment')
            .select(['tb_comment.no_like'])
            .where('tb_comment.comment_id = :comment_id', { comment_id })
            .getOne();
        if (!comment) {
            return response.status(404).json({ error: 'Comentário não encontrado.' });
        }
        await this.commentRepository.createQueryBuilder('tb_comment')
            .update('tb_comment')
            .set({
            no_like: comment.no_like + 1
        })
            .where('tb_comment.comment_id = :comment_id', { comment_id })
            .execute();
        return response.status(204).end();
    }
    ;
    async createReply(comment_id, reply_content, forum, user_id) {
        const publi_date = new Date().toLocaleDateString();
        const reply = await this.replyRepository.createQueryBuilder('reply')
            .insert()
            .into('reply')
            .values({
            publi_date,
            comment_id,
            user_id,
            reply_content
        }).execute();
        this.commentGateway.handleNewMessage({
            comment_id,
            reply_id: reply.identifiers[0].reply_id,
            reply_content,
            user_id,
            forum
        });
    }
    ;
    async removeReply(response, reply_id) {
        const reply = await this.replyRepository.createQueryBuilder('reply')
            .select(['reply.reply_id'])
            .where('reply.reply_id = :reply_id', { reply_id })
            .getOne();
        if (!reply) {
            return response.status(404).json({ error: 'Resposta não encontrada no servidor.' });
        }
        ;
        await this.replyRepository.createQueryBuilder('reply')
            .delete()
            .where('reply.reply_id = :reply_id', { reply_id })
            .execute();
        return response.status(204).end();
    }
    ;
    async removeLike(response, comment_id) {
        const comment = await this.commentRepository.createQueryBuilder('tb_comment')
            .select(['tb_comment.no_like'])
            .where('tb_comment.comment_id = :comment_id', { comment_id })
            .getOne();
        if (!comment) {
            return response.status(404).json({ error: 'Comentário não encontrado.' });
        }
        if (comment.no_like > 0) {
            await this.commentRepository.createQueryBuilder('tb_comment')
                .update('tb_comment')
                .set({
                no_like: comment.no_like - 1
            })
                .where('tb_comment.comment_id = :comment_id', { comment_id })
                .execute();
        }
        return response.status(204).end();
    }
    ;
};
CommentService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(comment_entity_1.Comment)),
    __param(1, typeorm_2.InjectRepository(reply_entity_1.Reply)),
    __param(2, typeorm_2.InjectRepository(forum_entity_1.Forum)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        comment_gateway_1.CommentGateway])
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map