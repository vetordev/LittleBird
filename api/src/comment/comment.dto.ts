import { IsString, IsNotEmpty } from "class-validator";

export class GetRepliesDto {
  @IsString() @IsNotEmpty()
  comment_id: number;
};

export class CreateLikeDto {
  @IsString() @IsNotEmpty()
  comment_id: number;
};

export class CreateReplyParamDto {
  @IsString() @IsNotEmpty()
  comment_id: number;
};

export class CreateReplyBodyDto {
  @IsString() @IsNotEmpty()
  reply_content: string;
};

export class RemoveReplyDto {
  @IsString() @IsNotEmpty()
  reply_id: number;
};

export class RemoveLikeDto {
  @IsString() @IsNotEmpty()
  comment_id: number;
};

export class GetCommentsByForumDto {
  @IsString() @IsNotEmpty()
  forum_id: number;
};

export class GetCommentsByForumQueryDto {
  @IsString() @IsNotEmpty()
  page: number;

  @IsString() @IsNotEmpty()
  lastMessage: number;
};

export class QueryPageDto {
  @IsString() @IsNotEmpty()
  page: number;

};

export class CreateReplyQueryDto {
  @IsString() @IsNotEmpty()
  forum: string;
}

export class HandleJoinCommentDto {
  idRoom: string;
};

export class HandleLeaveCommentDto {
  idRoom: string;
};