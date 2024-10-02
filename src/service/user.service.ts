import { Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';

@Injectable()
export class UserService {
  private users = [
    new User(1, 'john', 'changeme'),
    new User(2, 'maria', 'guess'),
  ];

  create(user: User) {
    this.users.push(user);
  }

  findAll(): User[] {
    return this.users;
  }

  /**
   * Fix required
   * @param id
   */
  findOne(id: number): User {
    return this.users[id];
  }

  update(_user: User) {
    this.users.pop();
    this.users.push(_user);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
