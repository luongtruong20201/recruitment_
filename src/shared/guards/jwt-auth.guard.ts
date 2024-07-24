import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { EAuthKey, EGuardKey } from 'src/constants/auth.constant';

@Injectable()
export class JwtAuthGuard extends AuthGuard(EGuardKey.JWT) {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      EAuthKey.PUBLIC,
      [context.getClass(), context.getHandler()],
    );
    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }
}
