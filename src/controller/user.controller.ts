import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ForbiddenException,
  UseFilters,
  ValidationPipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { AllExceptionsFilter } from '../filter/all-exceptions.filter';
// import { ZodValidationPipe } from '../../pipe/validation/zod.validation.pipe';
import { RolesGuard } from '../guard/role.guard';
import { Roles } from '../guard/decorator/roles.decorator.guard';
import { LoggingInterceptor } from '../interceptor/logging.interceptor';
import { User } from '../entity/user.entity';
import { HttpExceptionFilter } from '../filter/http-exceptions.filter';

@Controller('user')
@UseGuards(RolesGuard)
@UseFilters(new AllExceptionsFilter())
@UseFilters(new HttpExceptionFilter())
@UseInterceptors(LoggingInterceptor)
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  @Roles(['admin'])
  // @UsePipes(new ZodValidationPipe(createUserSchema))
  async create(@Body(new ValidationPipe()) user: User) {
    return this.usersService.create(user);
  }

  @Get()
  @UseFilters(new AllExceptionsFilter())
  async findAll() {
    try {
      return this.usersService.findAll();
    } catch (error) {
      throw new ForbiddenException();
    }
  }

  @Get(':id')
  async findOne(id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(id: string, @Body() user: User) {
    // In typeORM the query is similar to below
    // UPDATE USERS SET USERS.EMAIL = EMAIL AND USERS.PASSWORD = PASSWORD WHERE USER.ID = ID
    return this.usersService.update(user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
