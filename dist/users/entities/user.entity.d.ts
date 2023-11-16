export declare class User {
    id: string;
    username: string;
    email: string;
    role: string;
    password: string;
    image: string;
    github: string;
    linkenIn: string;
    twitter: string;
    short_bio: string;
    portfolio_url: string;
    skills: UserSkill[];
}
export declare class UserSkill {
    id: string;
    name: string;
    description: string;
    user: User;
}
