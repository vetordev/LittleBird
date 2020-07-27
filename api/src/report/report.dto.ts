import { IsString, IsNotEmpty } from "class-validator";

export class CreateReportReplyBodyDto {

  @IsString() @IsNotEmpty()
  report_content: string;

  @IsString() @IsNotEmpty()
  report_type: number;
};

export class CreateReportCommentBodyDto {

  @IsString() @IsNotEmpty()
  report_content: string;

  @IsString() @IsNotEmpty()
  report_type: number;
}; 

export class CreateReportReplyParamDto {

  @IsString() @IsNotEmpty()
  reply_id: number;
};

export class CreateReportCommentParamDto {

  @IsString() @IsNotEmpty()
  comment_id: number;
};