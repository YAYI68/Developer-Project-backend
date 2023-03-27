import { CurrentUserInterface } from './interfaces/current-user.interface';
import { UpdateUserProfileDto } from './dto/create-user.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto, UserProfileDto } from './dto/user.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './entities/user.entity';
import { Roles } from './decorators/user-role.decorator';
import { UserRole } from './enum/user-roles.enum';
import { RolesGuard } from './guard/user-roles.guard';




@Controller('user')
// @UseGuards(JwtAuthGuard)

export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Serialize(UserDto)
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Get()
  allUser() {
    return this.usersService.findAll();
  }
  
  @Serialize(UserProfileDto)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("/account")
  account(@CurrentUser() user:CurrentUserInterface,@Body()  userProfileDto:UpdateUserDto){
    console.log({userNew:userProfileDto})
    const { userId } = user
    if(userId){
      return this.usersService.userprofile(userId,userProfileDto)
    }
    else{
      throw new UnauthorizedException()
    }
    
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(id, updateUserDto);
  // }
  @UseGuards(JwtAuthGuard)
  @Delete('/account')
  remove( @CurrentUser() user:CurrentUserInterface) {
    return this.usersService.remove(user.userId);
  }
  
 
}
