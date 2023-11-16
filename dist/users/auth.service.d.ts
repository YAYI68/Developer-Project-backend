import { Repository } from 'typeorm';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    create(createUserDto: CreateUserDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    hashData(data: string): Promise<any>;
    verifyHash(data: string, hashData: string): Promise<any>;
    signin(loginUser: LoginUserDto): Promise<{
        token: {
            accessToken: string;
            refreshToken: string;
        };
        user: User;
    }>;
    ChangePassword(userId: string, password: string): Promise<{
        message: string;
    }>;
    refreshToken(userId: string, refresh: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    private getTokens;
}
