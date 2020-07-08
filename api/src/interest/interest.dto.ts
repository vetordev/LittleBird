import { IsInt, IsNotEmpty, IsString } from "class-validator"

export class GetInterestDto {
  theme_id: number
  theme_name: string
  theme_img_id: {
     theme_id: number;
     img_url: string
  }
}

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