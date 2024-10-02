import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from '../controller/app.controller';
import { AppService } from '../service/app.service';
import { UserModule } from './user.module';
import { LoggerMiddleware } from '../common/middleware/logger.middleware';
import { RolesGuard } from '../guard/role.guard';
import { LoggingInterceptor } from '../interceptor/logging.interceptor';
import { UserController } from '../controller/user.controller';
import { UserService } from '../service/user.service';
import { HttpExceptionFilter } from '../filter/http-exceptions.filter';
import { AllExceptionsFilter } from '../filter/all-exceptions.filter';

@Module({
  controllers: [AppController, UserController],
  imports: [UserModule],
  providers: [
    AppService,
    UserService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'users', method: RequestMethod.ALL });
  }

  /**
   * consumer
   * .apply(logger)
   * .forRoutes(CatsController);
   */

  /**
   * Exclude
   * consumer
   *   .apply(LoggerMiddleware)
   *   .exclude(
   *     { path: 'user', method: RequestMethod.GET },
   *     { path: 'user', method: RequestMethod.POST },
   *     'user/(.*)',
   *   )
   *   .forRoutes(CatsController);
   *
   */
}
