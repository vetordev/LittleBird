import { CreateUserDto, GetUserDto, UpdateUserDto } from './user.dto';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { AuthService } from '../auth/auth.service';
export declare class UserService {
    private readonly userRepository;
    private readonly authService;
    constructor(userRepository: Repository<User>, authService: AuthService);
    createUser(user: CreateUserDto): Promise<object>;
    getUserByEmail(email: string): Promise<any | null>;
    getUserById(user_id: number): Promise<GetUserDto>;
    updateUser(user_id: number, user: UpdateUserDto): Promise<void>;
}
