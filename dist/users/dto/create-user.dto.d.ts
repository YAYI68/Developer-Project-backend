import { User } from '../entities/user.entity';
export declare class CreateUserDto {
    username: string;
    email: string;
    password: string;
}
export declare class LoginUserDto {
    email: string;
    password: string;
}
export declare class UpdateUserProfileDto {
    username: string;
    github: string;
    image: string;
    linkenIn: string;
    twitter: string;
    short_bio: string;
    portfolio_url: string;
    user: User;
}
