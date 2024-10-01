import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from '../../service/user/user.service';
import { User } from '../../entity/user/user.entity';

/**
 * Use TypeORM instead
 */
@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UserService) {}

  @Mutation(() => User)
  createUser(@Args('user') user: User) {
    return this.usersService.create(user);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('email', { type: () => Int }) email: string) {
    return this.usersService.findOne(email);
  }

  @Mutation(() => User)
  updateUser(@Args('user') user: User) {
    return this.usersService.update(user.email, user);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }
}
