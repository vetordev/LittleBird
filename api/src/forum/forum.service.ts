import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Forum } from './entity/forum.entity';
import { Repository } from 'typeorm';
import { Comment } from '../comment/entity/comment.entity';
import { Response } from 'express';
import { ThemeForum } from './entity/theme-forum.entity';
import { LikeForum } from './entity/like-forum.entity';
import { ForumGateway } from "./forum.gateway";
import { Theme } from '../theme/entity/theme.entity';
import { Reply } from '../comment/entity/reply.entity';

@Injectable()
export class ForumService {

  constructor(
    @InjectRepository(Forum) private readonly forumRepository: Repository<Forum>,
    @InjectRepository(Comment) private readonly commentRepository: Repository<Comment>,
    @InjectRepository(ThemeForum) private readonly themeForumRepository: Repository<ThemeForum>,
    @InjectRepository(Theme) private readonly themeRepository: Repository<Theme>,
    @InjectRepository(LikeForum) private readonly likeForumRepository: Repository<LikeForum>,
    @InjectRepository(Reply) private readonly replyRepository: Repository<Reply>,
    private readonly forumGateway: ForumGateway
  ) {}

  async getForumByTheme(response: Response, theme_id: number, page: number): Promise<Response | void> {
    const theme = await this.themeRepository.createQueryBuilder('theme')
      .select(['theme.theme_id'])
      .where('theme.theme_id = :theme_id', { theme_id })
      .getOne();

    if(!theme) {
      return response.status(404).json({ error: 'O Tema não existe no servidor.' })
    }

    let foruns: any = await this.themeForumRepository.createQueryBuilder('theme_forum')
      .select(['theme_forum', 'forum.forum_id', 'forum.title', 'forum.no_like', 'forum_img'])
      .innerJoin('theme_forum.forum_id', 'forum')
      .innerJoin('forum.forum_img_id', 'forum_img')
      .where('theme_forum.theme_id = :theme_id', { theme_id })
      .orderBy('forum.no_like', 'ASC')
      .offset((page - 1) * 6)
      .limit(6)
      .getManyAndCount();

    const count = foruns[1];

    foruns = foruns[0].map( (forum) => {
      delete forum.theme_forum_id;
      delete forum.theme_id;

      forum.forum_id.img_url = forum.forum_id.forum_img_id.img_url

      delete forum.forum_id.forum_img_id
      return forum.forum_id;
    });


    return response.status(200).header('X-Total-Count', count).json(foruns);
  };

  async getForumByLike(response: Response, page: number): Promise<Response> {

    let query = "SELECT f.forum_id, f.title, i.img_url, f.no_like, (SELECT COUNT(comment_id) FROM tb_comment WHERE forum_id = f.forum_id) AS no_comment";
    query += " FROM forum AS f JOIN forum_img AS i ON (i.forum_img_id = f.forum_img_id)";
    query += " GROUP BY f.forum_id, i.img_url ORDER BY f.no_like ASC";
    query += ` LIMIT 6 OFFSET(${(page - 1) * 6})`;

    const foruns: Forum[] = await this.forumRepository.query(query);

    const count: any = await this.forumRepository.count();

    return response.status(200).header('X-Total-Count', count).json(foruns);
  };

  async getForumByUserLike(response: Response, user_id: number, page: number): Promise<Response> {
    let foruns: any = await this.likeForumRepository.createQueryBuilder('like_forum')
      .select(['like_forum', 'forum.forum_id', 'forum.title', 'forum.no_like', 'forum_img'])
      .innerJoin('like_forum.forum_id', 'forum')
      .innerJoin('forum.forum_img_id', 'forum_img')
      .where('like_forum.user_id = :user_id', { user_id })
      .orderBy('forum.no_like', 'ASC')
      .offset((page - 1) * 6)
      .limit(6)
      .getManyAndCount();

    const count = foruns[1];

    foruns = foruns[0].map( (forum) => {
      delete forum.theme_forum_id;
      delete forum.theme_id;
      return forum.forum_id;
    });

    return response.status(200).header('X-Total-Count', count).json(foruns);

  };

  async getForumAndComments(response: Response, forum_id: number, page: number): Promise<Response | void> {

    const forum = await this.forumRepository.createQueryBuilder('forum')
      .select(['forum', 'forum_img'])
      .innerJoin('forum.forum_img_id', 'forum_img')
      .where('forum.forum_id = :forum_id', { forum_id })
      .getOne();

    if(!forum) {
      return response.status(404).json({ error: "Forum não encontrado no servidor." })
    };

    let comments: any = await this.commentRepository.createQueryBuilder('tb_comment')
      .select(['tb_comment', 'user.user_id', 'user.username', 'user_img'])
      .innerJoin('tb_comment.user_id', 'user')
      .innerJoin('user.user_img_id', 'user_img')
      .where('tb_comment.forum_id = :forum_id', { forum_id })
      .orderBy('tb_comment.comment_id', 'DESC')
      .offset((page - 1) * 6)
      .limit(6)
      .getManyAndCount();

    const count = comments[1];

    comments = comments[0].map( (comment) => {
      delete comment.forum_id;
      return comment;
    });

    comments.map(async (comment) => {
      const reply = await this.replyRepository.createQueryBuilder('reply')
        .select(['reply', 'user.user_id', 'user.username', 'user_img'])
        .innerJoin('reply.user_id', 'user')
        .innerJoin('user.user_img_id', 'user_img')
        .where('reply.comment_id = :comment_id', { comment_id: comment.comment_id })
        .orderBy('reply.reply_id', 'DESC')
        .getOne();

      delete reply.comment_id;

      comment.reply = reply;
      return comment;
    });

    let themes: any = await this.themeForumRepository.createQueryBuilder('theme_forum')
      .select(['theme_forum', 'theme'])
      .innerJoin('theme_forum.theme_id', 'theme')
      .where('theme_forum.forum_id = :forum_id',  { forum_id })
      .getMany();

    themes = themes.map( (theme) => {
      delete theme.theme_id.theme_img_id;
      return theme.theme_id;
    });

    const forum_comments_themes = {
      ...forum,
      comments,
      themes
    };

    return response.status(200).header('X-Total-Count', count).json(forum_comments_themes);
  };

  async createComment(forum_id: number, comment_content : string, user_id: number): Promise<Response | void> {
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
      publi_date,
      user_id
    });
  };

  // TODO Adicionar verificação antes de inserir o like
  async createLike(response: Response, forum_id: number, user_id: number): Promise<Response | void> {
    const forum = await this.forumRepository.createQueryBuilder('forum')
      .select(['forum.forum_id'])
      .where('forum.forum_id = :forum_id', { forum_id })
      .getOne();

    if (!forum) {
      return response.status(404).json({ error: "A chave estrangeira não existe no servidor." });
    };

    const like_forum = await this.likeForumRepository.createQueryBuilder('like_forum')
      .select(['like_forum.like_forum_id'])
      .where('like_forum.forum_id = :forum_id', { forum_id })
      .andWhere('like_forum.user_id = :user_id', { user_id })
      .getOne();

    if(!like_forum) {

      await this.likeForumRepository.createQueryBuilder('like_forum')
      .insert()
      .into('like_forum')
      .values({
        forum_id,
        user_id
      })
      .execute();

      const forum: any = await this.forumRepository.createQueryBuilder('forum')
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

    return response.status(204).end();
  };

  async removeComment(response: Response, comment_id: number): Promise<Response | void> {

    const comment = await this.commentRepository.createQueryBuilder('tb_comment')
      .select(['tb_comment.comment_id'])
      .where('tb_comment.comment_id = :comment_id', { comment_id })
      .getOne();

    if(!comment) {
      return response.status(404).json({ error: 'Comentário não encontrado no servidor.' });
    }


    await this.commentRepository.createQueryBuilder('tb_comment')
      .delete()
      .where('tb_comment.comment_id = :comment_id', { comment_id })
      .execute()

    return response.status(204).end();

  };

  async removeLike(response: Response, forum_id: number, user_id: number): Promise<Response | void> {

    const like_forum = await this.likeForumRepository.createQueryBuilder('like_forum')
      .select(['like_forum.like_forum_id'])
      .where('like_forum.forum_id = :forum_id', { forum_id })
      .andWhere('like_forum.user_id = :user_id', { user_id })
      .getOne();

    if (!like_forum) {
      return response.status(404).json({ error: 'Like não encontrado no servidor.' })
    }

    await this.likeForumRepository.createQueryBuilder('like_forum')
      .delete()
      .where('like_forum.forum_id = :forum_id', { forum_id })
      .andWhere('like_forum.user_id = :user_id', { user_id })
      .execute();

    const forum: any = await this.forumRepository.createQueryBuilder('forum')
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
  };
}
