import { IsNotEmpty, IsString } from "class-validator";

export class GetArticleDto {
  @IsString() @IsNotEmpty()
  article_id: number;
}

export class GetArticlesByThemeDto {
  @IsString() @IsNotEmpty()
  theme_id: number;
}

export class DeleteArticleLikeDto {
  @IsString() @IsNotEmpty()
  article_id: number;
}

export class CreateArticleLikeDto {
  @IsString() @IsNotEmpty()
  article_id: number;
}

export class CreateArticleLaterDto {
  @IsString() @IsNotEmpty()
  article_id: number;
}

export class DeleteArticleLaterDto {
  @IsString() @IsNotEmpty()
  article_id: number;
}