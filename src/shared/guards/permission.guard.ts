import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EAuthKey, IJwtPayload } from 'src/constants/auth.constant';
import { PermissionRepository } from 'src/repositories/permission.repository';

@Injectable()
export class PermissionGuard implements CanActivate {
  private readonly logger = new Logger(PermissionGuard.name);

  constructor(
    private readonly permissionRepository: PermissionRepository,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      EAuthKey.PUBLIC,
      [context.getClass(), context.getHandler()],
    );

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const path = request.route.path;
    const method = request.method;
    const user: IJwtPayload = request.user;

    if (user.roleId !== null) {
      const permissions = await this.permissionRepository.getPermissionWithRole(
        user.roleId,
      );
      const valid = permissions.some(
        (item) => item.api === path && item.method === method,
      );
      return valid;
    }
    return false;
  }
}
