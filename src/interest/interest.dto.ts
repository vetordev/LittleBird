import { IsInt, IsNotEmpty, IsString } from "class-validator"

export class CreateInterestDto {
  @IsString()
  @IsNotEmpty()
  themes: string;

}

export class DeleteInterestDto {
  @IsString()
  @IsNotEmpty()
  interest_id: number;

}

export class QueryPageDto {
  @IsString() @IsNotEmpty()
  page: number;

}