import { Injectable } from '@nestjs/common';
import { User } from '../../entity/user/user.entity';

@Injectable()
export class UserService {
  private user: User;

  create(user: User) {
    this.user = user;
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, _user: User) {
    this.user = _user;
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
