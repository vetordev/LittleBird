import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(user: CreateUserDto): Promise<object>;
    getUser(request: any): Promise<import("./user.dto").GetUserDto>;
    updateUser(request: any, user: UpdateUserDto): Promise<void>;
}
