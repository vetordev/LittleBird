export declare class GetRepliesDto {
    comment_id: number;
}
export declare class CreateLikeDto {
    comment_id: number;
}
export declare class CreateReplyParamDto {
    comment_id: number;
}
export declare class CreateReplyBodyDto {
    reply_content: string;
}
export declare class RemoveReplyDto {
    reply_id: number;
}
export declare class RemoveLikeDto {
    comment_id: number;
}
export declare class GetCommentsByForumDto {
    forum_id: number;
}
export declare class QueryPageDto {
    page: number;
}
export declare class CreateReplyQueryDto {
    forum: string;
}
export declare class HandleJoinCommentDto {
    nameRoom: string;
}
export declare class HandleLeaveCommentDto {
    nameRoom: string;
}
