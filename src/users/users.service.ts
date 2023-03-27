import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto, UpdateUserProfileDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UnauthorizedException,NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepo:Repository<User>,
             
       ){}

  async findAll() {
   const users = await this.userRepo.find();
   return users
  }

  async findOne(id: string) {
    const user = await this.userRepo.findOne({
      where:{id:id},
    }) 
    return user;
  }
  
  async userprofile(userId:string,userProfileDto:UpdateUserDto){
     console.log({userProfileDto})
     const user =  await this.userRepo.findOne({where:{id:userId}})
    if(user){
       try{
         const user = await this.userRepo.update({id:userId},userProfileDto);
         return user
       }
       catch(err){
          throw new BadRequestException()
       }
    }
    else{
      throw new NotFoundException("user does not exist")
    }
  }
  

  async remove(userId: string) {
     const user = await this.userRepo.findOne({where:{id:userId}})
     if(user){
      console.log({user})
      await this.userRepo.delete({id:userId})
      return { message: "User Removed Successfully"}
     }
     else{
      throw new NotFoundException("user does not exist")
     }
  
  }


}
