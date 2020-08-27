import { IsNotEmpty, IsEmail, IsString, IsInt, IsOptional } from "class-validator";


export class CreateUserDto {

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  user_pass: string;

  @IsNotEmpty()
  @IsInt()
  user_img_id: number;

  @IsNotEmpty()
  // @IsDateString()
  born_in: string
}

export class UpdateUserDto {

  @IsString()
  @IsOptional()
  username ?: string;

  @IsString()
  @IsOptional()
  user_pass ?: string;

  @IsEmail()
  @IsOptional()
  email ?: string;

  @IsInt()
  @IsOptional()
  user_img_id ?: number;

  @IsString()
  @IsOptional()
  born_in ?: string;
}

export class GetUserDto {

  email: string;
  user_img_id: number;
  username: string;
}