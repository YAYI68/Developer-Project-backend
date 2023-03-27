
import { Exclude } from 'class-transformer';
import { IsEmail,IsString,MinLength,MaxLength,Matches, IsOptional } from 'class-validator';
import { User } from '../entities/user.entity';
export class CreateUserDto {
    
    @IsString()
    @MinLength(3,{message:'Username is too short'})
    @MaxLength(20,{message:'Username is too Long'})
    username: string;

    @IsString()
    @IsEmail()
    email: string;    
    
  
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password must contain at least Capital letters,lowercase letters,numbers and symbols',
  }) 
  password: string;
    
}

export class LoginUserDto {

  @IsString()
  @IsEmail()
  email: string;    

  @IsString() 
  password: string;
  
}

export class UpdateUserProfileDto {
  
  @IsString()
  @IsOptional()
  username: string;

  @IsString()
  @IsOptional()
  github:string;

  @IsString()
  @IsOptional()
  image:string;
  
  @IsOptional()
  @IsString()
  linkenIn:string
  
     
  @IsOptional()
  @IsString()
  twitter:string;

   
  @IsOptional()
  @IsString()
  short_bio:string

    
  @IsOptional()
  @IsString()
  portfolio_url:string

     
  @IsOptional()
  @IsString()
  user: User
}