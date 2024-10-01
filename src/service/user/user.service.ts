import { Injectable } from '@nestjs/common';
import { User } from '../../entity/user/user.entity';

@Injectable()
export class UserService {
  private users = [
    new User(1, 'john', 'changeme'),
    new User(2, 'maria', 'guess'),
  ];

  create(user: User) {
    this.users.push(user);
  }

  findAll() {
    return this.users;
  }

  findOne(): User {
    // return `This action returns a #${email} user`;
    return this.users[0];
  }

  update(_user: User) {
    this.users.pop();
    this.users.push(_user);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
