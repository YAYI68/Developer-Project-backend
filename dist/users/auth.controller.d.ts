import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/user-password.dto';
import { CurrentUserInterface } from './interfaces/current-user.interface';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(createUserDto: CreateUserDto, session: any): Promise<{
        accessToken: string;
    }>;
    signin(loginUserDto: LoginUserDto, session: any): Promise<{
        userId: string;
        accessToken: string;
        refreshToken: string;
    }>;
    refreshToken(user: any, refresh_token: string, session_token: string, session: any): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    change_password(user: CurrentUserInterface, changepassword: ChangePasswordDto): Promise<{
        message: string;
    }>;
}
