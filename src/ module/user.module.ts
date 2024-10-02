import { Module } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserController } from '../controller/user.controller';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '../filter/http-exceptions.filter';
import { AllExceptionsFilter } from '../filter/all-exceptions.filter';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class UserModule {}
