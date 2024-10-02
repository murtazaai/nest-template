import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const validateRequest = (request: any) => {
  return undefined;
};

@Injectable()
export class Auth0Guard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}
