import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EGuardKey } from 'src/constants/auth.constant';

@Injectable()
export class LocalAuthGuard extends AuthGuard(EGuardKey.LOCAL) {}
