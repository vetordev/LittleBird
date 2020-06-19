import { IsNotEmpty, IsEmail, IsNumber, IsDate, IsDateString, IsMACAddress } from "class-validator";


export class CreateUserDto {

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  user_pass: string;

  @IsNotEmpty()
  @IsNumber()
  user_img_id: number;

  @IsNotEmpty()
  // @IsDateString()
  born_in: string
}

export class UpdateUserDto {
  username ?: string;
  password ?: string;
  email ?: string;
  user_img_id ?: number;
}

export class GetUserDto {
  email: string;
  user_img_id: number;
  username: string;
}