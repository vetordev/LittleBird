import { UserService } from '../user/user.service';
import { JwtService } from "@nestjs/jwt";
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(email: string, user_pass: string): Promise<{
        user_id: any;
        email: any;
    }>;
    login(user_id: number, email: string): Promise<{
        token: string;
    }>;
}
