import { SetMetadata, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { EAuthKey } from 'src/constants/auth.constant';

export const GuardLocal = () => UseGuards(LocalAuthGuard);

export const GuardJwt = () => UseGuards(JwtAuthGuard);

export const GuardPublic = () => SetMetadata(EAuthKey.PUBLIC, true);
