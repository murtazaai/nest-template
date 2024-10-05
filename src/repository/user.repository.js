import { Connection } from "../database/connection.database";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository {
  // eslint-disable-next-line prettier/prettier
  @Inject('CONNECTION')connection: Connection;
  constructor(@Inject('CONNECTION') connection: Connection) {
    this.connection = connection;
  }
}