export declare class UserDto {
    id: string;
    username: string;
    email: string;
    role: string;
}
export declare class UserSkillReturnDto {
    id: string;
    name: string;
    description: string;
}
export declare class UserProfileDto extends UserDto {
    github: string;
    image: string;
    linkenIn: string;
    twitter: string;
    short_bio: string;
    portfolio_url: string;
}
export declare class UserPasswordDto {
    password: string;
}
