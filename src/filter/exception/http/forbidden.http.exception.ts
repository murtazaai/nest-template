import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenHttpException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}
