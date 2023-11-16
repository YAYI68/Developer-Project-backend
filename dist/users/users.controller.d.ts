import { CurrentUserInterface } from './interfaces/current-user.interface';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserSkillDto } from './dto/user-skill.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    allUser(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    account(user: CurrentUserInterface, userProfileDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    remove(user: CurrentUserInterface): Promise<{
        message: string;
    }>;
    add_skill(user: CurrentUserInterface, userskill: UserSkillDto): Promise<import("./entities/user.entity").UserSkill>;
}
