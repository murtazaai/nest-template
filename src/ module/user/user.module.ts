import { Module } from '@nestjs/common';
import { UsersService } from '../../service/users/users.service';
import { UserController } from '../../controller/user/user.controller';

@Module({
  controllers: [UserController],
  providers: [UsersService],
})
export class UserModule {}
