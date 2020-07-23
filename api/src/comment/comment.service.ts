import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Reply } from './entity/reply.entity';
import { Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entity/comment.entity';

@Injectable()
export class CommentService {

  constructor(
    @InjectRepository(Comment) private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Reply) private readonly replyRepository: Repository<Reply>
  ) {};

  async getReplies(response: Response, comment_id: number): Promise<Response> {

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
      .getMany();

    return response.status(200).json(replies);
  };

  async createLike(response: Response, comment_id: number): Promise<Response | void> {
    const comment = await this.commentRepository.createQueryBuilder('tb_comment')
      .select(['tb_comment.no_like'])
      .where('tb_comment.comment_id = :comment_id', { comment_id })
      .getOne();

    if(!comment) {
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
  };

  async createReply(comment_id: number, reply_content: string, user_id: number): Promise<Response | void> {
    const publi_date = new Date().toLocaleDateString();

    await this.replyRepository.createQueryBuilder('reply')
      .insert()
      .into('reply')
      .values({
        publi_date,
        comment_id,
        user_id,
        reply_content
      }).execute();
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
