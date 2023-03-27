
import { Exclude, Expose } from 'class-transformer'


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
  }