import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService],
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
