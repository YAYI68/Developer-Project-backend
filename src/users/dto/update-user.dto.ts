import { PartialType } from '@nestjs/mapped-types';
import { UpdateUserProfileDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(UpdateUserProfileDto) {}
