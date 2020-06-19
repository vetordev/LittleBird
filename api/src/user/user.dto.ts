export class CreateUserDto {
  username: string;
  user_pass: string;
  email: string;
  user_img_id: number;
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