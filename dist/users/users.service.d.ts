import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserSkill } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserSkillDto } from './dto/user-skill.dto';
export declare class UsersService {
    private readonly userRepo;
    private readonly userSkillRepo;
    constructor(userRepo: Repository<User>, userSkillRepo: Repository<UserSkill>);
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    userprofile(userId: string, userProfileDto: UpdateUserDto): Promise<{
        message: string;
    }>;
    remove(userId: string): Promise<{
        message: string;
    }>;
    addSkill(userId: string, userskill: UserSkillDto): Promise<UserSkill>;
}
