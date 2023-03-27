import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { CreateUserDto, UpdateUserProfileDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserSkill } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UnauthorizedException,NotFoundException } from '@nestjs/common/exceptions';
import { UserSkillDto } from './dto/user-skill.dto';


@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepo:Repository<User>,
            @InjectRepository(UserSkill) private readonly userSkillRepo:Repository<UserSkill>,
             
       ){}

  async findAll() {
   const users = await this.userRepo.find();
   return users
  }

  async findOne(id: string) {
    const user = await this.userRepo.findOne({
      where:{id:id},  
      relations:{
        skills:true,
      }
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

  async addSkill(userId:string,userskill:UserSkillDto){
      const { name } = userskill
      const existSkill = await this.userSkillRepo.findOne({where:{name:name}})
      if(!existSkill ){
        try{
      
          const user = await this.userRepo.findOne({where:{id:userId}})
          if(user){
              const skill =  this.userSkillRepo.create({
                ...userskill,
                user: user
               })

               return this.userSkillRepo.save(skill)
          }
          else{
          throw new  NotFoundException()
          }
     }
     catch(err){
      throw new BadRequestException()
     }
      }
      else{
        throw new ConflictException('Skill already exists');
      }  
  }
}
