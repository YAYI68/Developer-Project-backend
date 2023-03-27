import { Injectable } from '@nestjs/common';
import { CreateUserDto, UserProfileDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserProfile } from './entities/user-profile';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepo:Repository<User>,
              @InjectRepository(UserProfile) private readonly userProfileRepo:Repository<UserProfile>,
       ){}

  async findAll() {
   const users = await this.userRepo.find();
   return users
  }

  async findOne(id: string) {
    const user = await this.userRepo.findOne({
      where:{id:id},
      relations:{
        profile:true
      }
    }) 
    return user;
  }
  
  
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

userprofile(userProfileDto:UserProfileDto){
  const user =  this.userProfileRepo.create({
    ...userProfileDto
   })
   return this.userProfileRepo.save(user);
}
}
