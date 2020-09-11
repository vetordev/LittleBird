/// <reference types="express" />
import { CommentService } from './comment.service';
import { GetRepliesDto, CreateLikeDto, CreateReplyParamDto, CreateReplyBodyDto, RemoveReplyDto, RemoveLikeDto, GetCommentsByForumDto, CreateReplyQueryDto } from './comment.dto';
import { QueryPageDto } from './comment.dto';
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    getReplies(response: any, params: GetRepliesDto, query: QueryPageDto): Promise<import("express").Response<any>>;
    getCommentsByForum(response: any, params: GetCommentsByForumDto, query: QueryPageDto): Promise<import("express").Response<any>>;
    createLike(response: any, params: CreateLikeDto): Promise<void | import("express").Response<any>>;
    createReply(params: CreateReplyParamDto, body: CreateReplyBodyDto, query: CreateReplyQueryDto, request: any): Promise<void | import("express").Response<any>>;
    removeReply(response: any, params: RemoveReplyDto): Promise<void | import("express").Response<any>>;
    removeLike(response: any, params: RemoveLikeDto): Promise<void | import("express").Response<any>>;
}
