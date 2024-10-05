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
import { Connection } from '../database/connection.database';
import {
  ConfigService,
  DevelopmentConfigService,
  ProductionConfigService,
} from '../service/config.service';
// import configuration from '../config/configuration';

@Module({
  controllers: [AppController, UserController],
  imports: [
    UserModule,
    // ConfigModule.forRoot({
    //   load: [configuration],
    // }),
  ],
  providers: [
    AppService,
    UserService,
    {
      provide: ConfigService,
      useClass:
        process.env.NODE_ENV === 'development'
          ? DevelopmentConfigService
          : ProductionConfigService,
    },
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
    {
      provide: 'CONNECTION',
      useValue: Connection,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'users', method: RequestMethod.ALL });
  }
}
