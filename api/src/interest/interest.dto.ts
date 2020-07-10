import { IsInt, IsNotEmpty, IsString } from "class-validator"

export class CreateInterestDto {
  @IsInt()
  @IsNotEmpty()
  theme_id: number;

}

export class DeleteInterestDto {
  @IsString()
  @IsNotEmpty()
  interest_id: number;

}