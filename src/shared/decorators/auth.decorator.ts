import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { EAuthKey, IJwtPayload } from 'src/constants/auth.constant';

export const GuardLocal = () => UseGuards(LocalAuthGuard);

export const GuardJwt = () => UseGuards(JwtAuthGuard);

export const GuardPublic = () => SetMetadata(EAuthKey.PUBLIC, true);

export const AuthUser = () =>
  createParamDecorator((_: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user as IJwtPayload;
  })();
