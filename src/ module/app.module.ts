import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from '../controller/app.controller';
import { AppService } from '../service/app.service';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from '../common/middleware/logger.middleware';
import { HttpExceptionFilter } from '../filter/http-exception.filter';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
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
