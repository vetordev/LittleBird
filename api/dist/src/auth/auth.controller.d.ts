import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(request: any): Promise<{
        token: string;
    }>;
}
