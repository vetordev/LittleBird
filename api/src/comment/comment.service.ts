import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Reply } from './entity/reply.entity';
import { Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entity/comment.entity';
import { Forum } from '../forum/entity/forum.entity';
import { CommentGateway } from './comment.gateway';
import { LikeComment } from './entity/like-comment.entity';

@Injectable()
export class CommentService {

  constructor(
    @InjectRepository(Comment) private readonly commentRepository: Repository<Comment>,
    @InjectRepository(LikeComment) private readonly likeCommentRepository: Repository<LikeComment>,
    @InjectRepository(Reply) private readonly replyRepository: Repository<Reply>,
    @InjectRepository(Forum) private readonly forumRepository: Repository<Forum>,
    private readonly commentGateway: CommentGateway
  ) {};

  async getReplies(response: Response, comment_id: number, page: number): Promise<Response> {

    const comment = await this.commentRepository.createQueryBuilder('tb_comment')
      .select(['tb_comment.comment_id'])
      .where('tb_comment.comment_id = :comment_id', { comment_id })
      .getOne();

    if(!comment) {
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
  };

  async getCommentsByForum(response: Response, forum_id: number, page: number) {

    const forum = await this.forumRepository.createQueryBuilder('forum')
      .select(['forum'])
      .where('forum.forum_id = :forum_id', { forum_id })
      .getOne();

    if (!forum) {
      return response.status(404).json({ error: 'Fórum não encontrado.' });
    };

    let comments = await this.commentRepository.createQueryBuilder('tb_comment')
      .select(['tb_comment', 'user.user_id', 'user.username', 'user_img'])
      .innerJoin('tb_comment.user_id', 'user')
      .innerJoin('user.user_img_id', 'user_img')
      .where('tb_comment.forum_id = :forum_id', { forum_id })
      .orderBy('tb_comment.comment_id', 'DESC')
      .offset((page - 1) * 6)
      .limit(6)
      .getMany();

    comments = comments.map( (comment) => {
      delete comment.forum_id;
      return comment;
    });

    return response.status(200).json(comments);
  };

  async createLike(user_id: number, comment_id: number): Promise<Response | void> {

    await this.likeCommentRepository.createQueryBuilder('like_comment')
      .insert()
      .into('like_comment').values({
        comment_id,
        user_id,
      }).execute();

    const comment = await this.commentRepository.createQueryBuilder('tb_comment')
      .select(['tb_comment.no_like'])
      .where('tb_comment.comment_id = :comment_id', { comment_id })
      .getOne();

    await this.commentRepository.createQueryBuilder('tb_comment')
      .update('tb_comment')
      .set({
        no_like: comment.no_like + 1
      })
      .where('tb_comment.comment_id = :comment_id', { comment_id })
      .execute();

  };

  async createReply(comment_id: number, reply_content: string, forum: string,user_id: number): Promise<Response | void> {
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
  };

  async removeReply(response: Response, reply_id: number): Promise<Response | void> {

    const reply = await this.replyRepository.createQueryBuilder('reply')
      .select(['reply.reply_id'])
      .where('reply.reply_id = :reply_id', { reply_id })
      .getOne();

    if(!reply) {
      return response.status(404).json({ error: 'Resposta não encontrada no servidor.' });
    };

    await this.replyRepository.createQueryBuilder('reply')
      .delete()
      .where('reply.reply_id = :reply_id', { reply_id })
      .execute();

    return response.status(204).end();
  };

  async removeLike(response: Response, comment_id: number): Promise<Response | void> {
    const comment = await this.commentRepository.createQueryBuilder('tb_comment')
      .select(['tb_comment.no_like'])
      .where('tb_comment.comment_id = :comment_id', { comment_id })
      .getOne();

    if(!comment) {
      return response.status(404).json({ error: 'Comentário não encontrado.' });
    }

    if(comment.no_like > 0){
      await this.commentRepository.createQueryBuilder('tb_comment')
        .update('tb_comment')
        .set({
          no_like: comment.no_like - 1
        })
        .where('tb_comment.comment_id = :comment_id', { comment_id })
        .execute();
    }
    return response.status(204).end();
  };
}
