import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import {
  ForgotPasswordReqBody,
  ForgotPasswordVerification,
  LoginReqBody,
  RefreshTokeReqBody,
  RegisterReqBody,
  RegisterVerificationReqBody,
  ResetPasswordReqBody,
} from './dtos/auth-request.dto';
import { GuardLocal, GuardPublic } from 'src/shared/decorators/auth.decorator';

@Controller('auth')
@ApiTags('auth')
@GuardPublic()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @GuardLocal()
  @ApiBody({ type: LoginReqBody })
  login(@Req() req: any) {
    return this.authService.login(req.user);
  }

  @Post('register')
  register(@Body() body: RegisterReqBody) {
    return this.authService.register(body);
  }

  @Post('register/verification')
  registerVerification(@Body() body: RegisterVerificationReqBody) {
    return this.authService.registerVerification(body.token);
  }

  @Post('forgot-password')
  forgotPassword(@Body() body: ForgotPasswordReqBody) {
    return this.authService.forgotPassword(body.email);
  }

  @Post('forgot-password/verification')
  forgotPasswordVerification(@Body() body: ForgotPasswordVerification) {
    return this.authService.forgotPasswordVerification(body.token);
  }

  @Post('reset-password')
  resetPassword(@Body() body: ResetPasswordReqBody) {
    return this.authService.resetPassword(body);
  }

  @Post('refresh-token')
  refreshToken(@Body() body: RefreshTokeReqBody) {
    return this.authService.refreshToken(body.refreshToken);
  }
}
