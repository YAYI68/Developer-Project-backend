
import { Exclude, Expose } from 'class-transformer'
import { ValidateNested } from 'class-validator';
import { UserSkill } from '../entities/user.entity';


export class UserDto {
    @Expose()
    id: string;
    @Expose()
    username: string;
    @Expose()
    email: string;
    @Expose()
    role: string;
 
  }

  export class UserSkillReturnDto {
    
    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    description: string;

}


  export class UserProfileDto extends UserDto {
    @Expose()
    github:string;
  
    @Expose()
    image:string;
    
    @Expose()
    linkenIn:string
    
       
    @Expose()
    twitter:string;
  
     
    @Expose()
    short_bio:string
  
      
    @Expose()
    portfolio_url:string
     
    // @Expose()
    // @ValidateNested({ each: true })
    // skills:UserSkillReturnDto[]  
  }

  export class UserPasswordDto {
    @Exclude()
    password: string;
  }

