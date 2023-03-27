import { IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto, UpdateUserProfileDto } from './create-user.dto';
import { User } from '../entities/user.entity';
import { Exclude } from 'class-transformer';

export class UpdateUserDto extends PartialType(UpdateUserProfileDto) {
   
}

