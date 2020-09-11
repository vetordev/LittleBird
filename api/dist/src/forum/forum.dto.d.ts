export declare class RemoveCommentDto {
    comment_id: number;
}
export declare class GetForumByThemeDto {
    theme_id: number;
}
export declare class GetForumAndCommentDto {
    forum_id: number;
}
export declare class CreateCommentParamDto {
    forum_id: number;
}
export declare class CreateCommentBodyDto {
    comment_content: string;
}
export declare class CreateLikeDto {
    forum_id: number;
}
export declare class RemoveLikeDto {
    forum_id: number;
}
export declare class QueryPageDto {
    page: number;
}
export declare class HandleJoinForumDto {
    nameRoom: string;
}
export declare class HandleLeaveForumDto {
    nameRoom: string;
}
