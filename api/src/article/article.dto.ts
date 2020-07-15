import { IsInt, IsNotEmpty } from "class-validator";

export class GetArticleDto {
  @IsInt() @IsNotEmpty()
  article_id: number;
}

export class GetArticlesByThemeDto {
  @IsInt() @IsNotEmpty()
  theme_id: number;
}

export class DeleteArticleLikeDto {
  @IsInt() @IsNotEmpty()
  article_id: number;
}

export class CreateArticleLikeDto {
  @IsInt() @IsNotEmpty()
  article_id: number;
}
