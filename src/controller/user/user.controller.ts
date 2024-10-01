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
  ParseIntPipe,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  DefaultValuePipe,
  ParseBoolPipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../../service/user/user.service';
import {
  CreateUserDto,
  createUserSchema,
} from '../../dto/user/create-user.dto';
import { UpdateUserDto } from '../../dto/user/update-user.dto';
import { HttpExceptionFilter } from '../../filter/http-exception.filter';
import { ZodValidationPipe } from '../../pipe/validation/zod.validation.pipe';
import { Query } from '@nestjs/graphql';
import { RolesGuard } from '../../guard/role.guard';
import { Roles } from '../../guard/decorator/roles.decorator.guard';
import { LoggingInterceptor } from '../../interceptor/logging.interceptor';

@Controller('user')
@UseGuards(RolesGuard)
@UseFilters(new HttpExceptionFilter())
@UseInterceptors(LoggingInterceptor)
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  @Roles(['admin'])
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseFilters(new HttpExceptionFilter())
  async findAll(
    // @ts-ignore
    @Query('activeOnly', new DefaultValuePipe(false), ParseBoolPipe)
    activeOnly: boolean,
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
  ) {
    try {
      this.usersService.findAll();
    } catch (error) {
      throw new ForbiddenException();
    }
  }

  /**
   * UUID
   * @param uuid
   * @Get(':uuid')
   * async findOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
   *   return this.catsService.findOne(uuid);
   * }
   */
  /**
   * Binding pipes
   * @param id
   */
  @Get(':id')
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
      new ParseIntPipe(), // Optional, remove one of the pipes
      /**
       * UserByIdPipe) userEntity: UserEntity
       * Either of a type among all the types, Entity is used with ORM
       */
    )
    id: number,
  ) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
