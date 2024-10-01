/**
 * Authentication
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      email: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      email: 'maria',
      password: 'guess',
    },
  ];

  async findOne(_email: string): Promise<{
    password: string;
    userId: number;
    email: string;
  }> {
    return this.users.find((user) => {
      return user.email === _email;
    });
  }
}
