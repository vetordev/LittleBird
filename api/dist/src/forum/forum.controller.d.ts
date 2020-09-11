/// <reference types="express" />
import { ForumService } from './forum.service';
import { GetForumByThemeDto, GetForumAndCommentDto, CreateLikeDto, CreateCommentParamDto, CreateCommentBodyDto, RemoveCommentDto, RemoveLikeDto, QueryPageDto } from './forum.dto';
export declare class ForumController {
    private readonly forumService;
    constructor(forumService: ForumService);
    getForumByTheme(response: any, params: GetForumByThemeDto, query: QueryPageDto): Promise<void | import("express").Response<any>>;
    getForumByLike(query: QueryPageDto): Promise<import("./entity/forum.entity").Forum[]>;
    getForumByUserLike(request: any, query: QueryPageDto): Promise<import("./entity/like-forum.entity").LikeForum[]>;
    getForumAndComments(response: any, params: GetForumAndCommentDto, query: QueryPageDto): Promise<void | import("express").Response<any>>;
    createComment(params: CreateCommentParamDto, body: CreateCommentBodyDto, request: any): Promise<void | import("express").Response<any>>;
    createLike(params: CreateLikeDto, request: any): Promise<void>;
    removeComment(response: any, params: RemoveCommentDto): Promise<void | import("express").Response<any>>;
    removeLike(response: any, params: RemoveLikeDto, request: any): Promise<void | import("express").Response<any>>;
}
