import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// @ts-ignore
export class UpdateUserDto extends PartialType(CreateUserDto) {}
