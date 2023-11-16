import { CurrentUserInterface } from './interfaces/current-user.interface';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { UserSkillDto } from './dto/user-skill.dto';

@Controller('user')
// @UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Serialize(UserDto)
  // @Roles(UserRole.ADMIN)
  // @UseGuards(JwtAuthGuard,RolesGuard)
  @Get()
  allUser() {
    return this.usersService.findAll();
  }

  // @Serialize(UserPasswordDto)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/account')
  account(
    @CurrentUser() user: CurrentUserInterface,
    @Body() userProfileDto: UpdateUserDto,
  ) {
    const { userId } = user;
    if (userId) {
      return this.usersService.userprofile(userId, userProfileDto);
    } else {
      throw new UnauthorizedException();
    }
  }
  @UseGuards(JwtAuthGuard)
  @Delete('/account')
  remove(@CurrentUser() user: CurrentUserInterface) {
    return this.usersService.remove(user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/skill')
  add_skill(
    @CurrentUser() user: CurrentUserInterface,
    @Body() userskill: UserSkillDto,
  ) {
    const { userId } = user;
    if (userId) {
      return this.usersService.addSkill(userId, userskill);
    } else {
      throw new UnauthorizedException();
    }
  }
}
