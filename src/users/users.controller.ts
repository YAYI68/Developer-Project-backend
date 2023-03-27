import { UserProfileDto } from './dto/create-user.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './entities/user.entity';
import { Roles } from './decorators/user-role.decorator';
import { UserRole } from './enum/user-roles.enum';
import { RolesGuard } from './guard/user-roles.guard';




@Controller('user')
// @UseGuards(JwtAuthGuard)
// @Serialize(UserDto)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Get()
  allUser() {
    return this.usersService.findAll();
  }
  
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Post("profile")
  profile(@Body()  userProfileDto:UserProfileDto){
    this.usersService.userprofile(userProfileDto)
  }
}
