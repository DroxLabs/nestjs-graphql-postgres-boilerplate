import { PartialType } from '@nestjs/mapped-types';
import { CreateUserInput } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserInput) {}
