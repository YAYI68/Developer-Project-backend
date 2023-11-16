import { CurrentUserInterface } from './interfaces/current-user.interface';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSkillDto } from './dto/user-skill.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    allUser(): Promise<import("./entities/user.entity").User[]>;
    findOne(id: string): Promise<import("./entities/user.entity").User>;
    account(user: CurrentUserInterface, userProfileDto: UpdateUserDto): Promise<{
        message: string;
    }>;
    remove(user: CurrentUserInterface): Promise<{
        message: string;
    }>;
    add_skill(user: CurrentUserInterface, userskill: UserSkillDto): Promise<import("./entities/user.entity").UserSkill>;
}
