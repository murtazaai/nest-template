import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../dto/user/create-user.dto';
import { UpdateUserDto } from '../../dto/user/update-user.dto';

@Injectable()
export class UserService {
  private _createUserDto: CreateUserDto;
  private _updateUserDto: UpdateUserDto;
  create(createUserDto: CreateUserDto) {
    this._createUserDto = createUserDto;
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this._updateUserDto = updateUserDto;
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
