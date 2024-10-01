import { Injectable } from '@nestjs/common';
import { User } from '../../entity/user/user.entity';

// This should be a real class/interface representing a user entity
// export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    new User(1, 'john', 'changeme'),
    new User(2, 'maria', 'guess'),
  ];

  async findOne(_email: string): Promise<User | undefined> {
    return this.users.find((user) => {
      return user.email === _email;
    });
  }
}
