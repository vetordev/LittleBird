export declare class CreateUserDto {
    username: string;
    email: string;
    user_pass: string;
    user_img_id: number;
    born_in: string;
}
export declare class UpdateUserDto {
    username?: string;
    user_pass?: string;
    email?: string;
    user_img_id?: number;
    born_in?: string;
}
export declare class GetUserDto {
    email: string;
    user_img_id: number;
    username: string;
}
