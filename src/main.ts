import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './ module/app.module';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { AllExceptionsFilter } from './filter/all-exceptions.filter';
import { ValidationPipe } from '@nestjs/common';
import { RolesGuard } from './guard/role.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new RolesGuard());
  app.useGlobalFilters(new HttpExceptionFilter());
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
