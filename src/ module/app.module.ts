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
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from '../common/middleware/logger.middleware';
import { HttpExceptionFilter } from '../filter/http-exception.filter';
import { RolesGuard } from '../guard/role.guard';
import { LoggingInterceptor } from '../interceptor/logging.interceptor';

@Module({
  controllers: [AppController],
  imports: [UserModule],
  providers: [
    AppService,
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
   *     { path: 'cats', method: RequestMethod.GET },
   *     { path: 'cats', method: RequestMethod.POST },
   *     'cats/(.*)',
   *   )
   *   .forRoutes(CatsController);
   *
   */
}
