import { Module } from '@nestjs/common';
import { UsersService } from '../../service/user/users.service';

@Module({
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
