import { EUserStatus } from './user.constant';

export enum EAuthType {
  REGISTER = 'register',
  FORGOT_PASSWORD = 'forgot_password',
}

export interface IOtpCode {
  otp: string;
  email: string;
  type: EAuthType;
}

export interface IJwtPayload {
  userId: number;
  status: EUserStatus;
  roleId?: number;
}

export enum EAuthKey {
  PUBLIC = 'public',
}

export enum EGuardKey {
  LOCAL = 'local',
  JWT = 'jwt',
}
