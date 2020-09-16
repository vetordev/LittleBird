import { Repository } from 'typeorm';
import { Reply } from './entity/reply.entity';
import { Response } from 'express';
import { Comment } from './entity/comment.entity';
import { Forum } from '../forum/entity/forum.entity';
import { CommentGateway } from './comment.gateway';
export declare class CommentService {
    private readonly commentRepository;
    private readonly replyRepository;
    private readonly forumRepository;
    private readonly commentGateway;
    constructor(commentRepository: Repository<Comment>, replyRepository: Repository<Reply>, forumRepository: Repository<Forum>, commentGateway: CommentGateway);
    getReplies(response: Response, comment_id: number, page: number): Promise<Response>;
    getCommentsByForum(response: Response, forum_id: number, page: number): Promise<Response<any>>;
    createLike(response: Response, comment_id: number): Promise<Response | void>;
    createReply(comment_id: number, reply_content: string, forum: string, user_id: number): Promise<Response | void>;
    removeReply(response: Response, reply_id: number): Promise<Response | void>;
    removeLike(response: Response, comment_id: number): Promise<Response | void>;
}
