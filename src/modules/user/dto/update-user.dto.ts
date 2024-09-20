import { PartialType } from '@nestjs/mapped-types';
import { CreateUserInput } from './user-auth.dto';

export class UpdateUserDto extends PartialType(CreateUserInput) {}
