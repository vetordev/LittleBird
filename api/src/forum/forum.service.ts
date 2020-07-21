import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Forum } from './entity/forum.entity';
import { Repository } from 'typeorm';
import { Comment } from '../comment/entity/comment.entity';
import { Response } from 'express';
import { ThemeForum } from './entity/theme-forum.entity';
import { LikeForum } from './entity/like-forum.entity';

@Injectable()
export class ForumService {

  constructor(
    @InjectRepository(Forum) private readonly forumRepository: Repository<Forum>,
    @InjectRepository(Comment) private readonly commentRepository: Repository<Comment>,
    @InjectRepository(ThemeForum) private readonly themeForumRepository: Repository<ThemeForum>,
    @InjectRepository(LikeForum) private readonly likeForumRepository: Repository<LikeForum>
  ) {}

  async getForumByTheme(response: Response, theme_id: number): Promise<Response> {

  };

  async getForumByLike(): Promise<Forum[]> {

  };

  async getForumByUserLike(user_id: number): Promise<Forum[]> {

  };

  async getForumAndComments(response: Response, forum_id: number): Promise<Response> {

  };

  async createComment(response: Response, forum_id: number, comment_content : string, user_id: number): Promise<Response> {

  };

  async createLike(response: Response, forum_id: number, user_id: number): Promise<Response> {

  };

  async removeComment(response: Response, comment_id: number, user_id: number): Promise<Response> {

  };

  async removeLike(response: Response, forum_id: number, user_id: number): Promise<Response> {

  };
}
