import { ChangePasswordDto } from './dto/user-password.dto';
import { JwtPayload } from './interfaces/jwt.interface';

import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes } from 'crypto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './contants/jwt-constant';


@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private jwtService: JwtService,
        ){}
    // Create a  new user and save to database and return token
    async create(createUserDto:CreateUserDto){
        const existUser = await this.userRepository.findOne({where:{email:createUserDto.email}})
        if(existUser){
            throw new ConflictException('Email already exists');
         }

        const hashpassword = await this.hashData(createUserDto.password)
        const user = this.userRepository.create({
            ...createUserDto,
            password: hashpassword
        })
        const currentUser =  await this.userRepository.save(user)
        const payload:JwtPayload = {userId:currentUser.id,role:currentUser.role} 
        
          const  token = await this.getTokens(payload)
        return token;
    }
 
    // hashing function
    async hashData(data:string){
        const salt =  await bcrypt.genSalt();
        const hashData = await bcrypt.hash(data,salt);
        return hashData
    }
    
    // To verify the hash function
    async verifyHash(data:string,hashData:string){
      const isValid = await bcrypt.compare(data, hashData)
      return isValid
    }

   async signin(loginUser:LoginUserDto){
        const { email , password } = loginUser
        const user = await this.userRepository.findOne({where:{email}})
        if(!user){
            throw new BadRequestException('invalid email/password')
        }
        const isValid = await this.verifyHash(password, user.password)
        if(user && isValid ){
            const { id,role } = user
            const payload:JwtPayload ={userId:id,role} 
            const  token = await this.getTokens(payload)
            return {token,user}
        }
        throw new BadRequestException('invalid email/password')
        
    }
    async ChangePassword (userId:string,password:string){
        try{
            const hashpassword = await this.hashData(password)
             await this.userRepository.update({id:userId},{password:hashpassword})
             return { message : 'Password updated successfully'}

        }
        catch(err){
            throw new BadRequestException()
        }
      
    }

    async refreshToken(userId:string,refresh:string){
        if(userId && refresh){
                const user = await this.userRepository.findOne({where: {id:userId}});
                const { id,role } = user
                const payload:JwtPayload ={userId:id,role} 
                const  token = await this.getTokens(payload)
                return token;
        }
        else {
            throw new UnauthorizedException()
        }  
    }
    
    // async updateRefreshToken(userId: string, refreshToken: string) {
    //     const hashedRefreshToken = await this.hashData(refreshToken);
    //     await this.userRepository.update(userId, {
    //       refreshToken:hashedRefreshToken 
    //     });
    //   }
    private async  getTokens (payload:JwtPayload){
        const [ accessToken,refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload,{
                secret:jwtConstants.secret,
                expiresIn:'5m'
            }),
            this.jwtService.signAsync(payload,{
                secret:jwtConstants.secret,
                expiresIn:'7d'
            })
        ])
        return {accessToken,refreshToken}
    }
}
