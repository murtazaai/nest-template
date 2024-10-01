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
import { UserService } from '../../service/user/user.service';
import { HttpExceptionFilter } from '../../filter/http-exception.filter';
// import { ZodValidationPipe } from '../../pipe/validation/zod.validation.pipe';
import { RolesGuard } from '../../guard/role.guard';
import { Roles } from '../../guard/decorator/roles.decorator.guard';
import { LoggingInterceptor } from '../../interceptor/logging.interceptor';
import { User } from '../../entity/user/user.entity';

@Controller('user')
@UseGuards(RolesGuard)
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
  @UseFilters(new HttpExceptionFilter())
  async findAll() {
    try {
      this.usersService.findAll();
    } catch (error) {
      throw new ForbiddenException();
    }
  }

  /**
   * Binding pipes
   */
  @Get()
  async findOne() {
    return this.usersService.findOne();
  }

  /**
   * Custom decorator @User
   * Only used with ORM
   */
  // @Get()
  // async findOne(@User() user: UserEntity) {
  //   console.log(user);
  // }

  @Patch(':id')
  update(@Body() user: User) {
    return this.usersService.update(user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
