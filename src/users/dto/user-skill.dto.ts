import { IsEmail,IsString,MinLength,MaxLength,Matches, IsOptional } from 'class-validator';

export class UserSkillDto {
 
    @IsString()
    @MaxLength(50)
    name: string;

    @IsString()
    @IsOptional()
    description: string;

}