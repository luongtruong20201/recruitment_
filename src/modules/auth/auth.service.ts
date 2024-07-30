import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EError } from 'src/constants/error.constant';
import { UserRepository } from 'src/repositories/user.repository';
import { hashPassword, verifyHashPassword } from 'src/shared/utils/hash-string';
import { RegisterReqBody, ResetPasswordReqBody } from './dtos/auth-request.dto';
import {
  generateOtp,
  generateOtpSecret,
  verifyOtp,
} from 'src/shared/utils/otp';
import { EUserStatus } from 'src/constants/user.constant';
import { EEnv } from 'src/constants/env.constant';
import { MailService } from '../mail/mail.service';
import { ConfigService } from '@nestjs/config';
import {
  decryptWithAES,
  encryptWithAES,
} from 'src/shared/utils/encrypt-decrypt';
import { EAuthType, IJwtPayload, IOtpCode } from 'src/constants/auth.constant';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException(EError.USER_NOT_FOUND);
    }

    const isMatch = verifyHashPassword(password, user.password);
    if (!isMatch) {
      throw new BadRequestException(EError.EMAIL_OR_PASSWORD_INVALID);
    }

    return user;
  }

  async register(data: RegisterReqBody) {
    const userExistWithEmail = await this.userRepository.findOneBy({
      email: data.email,
    });

    if (userExistWithEmail) {
      throw new BadRequestException(EError.USER_EXIST_WITH_EMAIL);
    }

    const otpSecret = generateOtpSecret();
    const password = hashPassword(data.password);

    const user = this.userRepository.create({
      address: data.address,
      age: data.age,
      email: data.email,
      name: data.name,
      otpSecret,
      status: EUserStatus.PENDING,
      password,
    });

    const now = Date.now();
    const otp = generateOtp(user.otpSecret, {
      epoch: now,
      step: 600,
      window: 1,
    });
    const encodedData: IOtpCode = {
      otp,
      email: user.email,
      type: EAuthType.REGISTER,
    };
    const clientUrl = this.configService.get<string>(EEnv.CLIENT_URL);
    const verificationUrl = new URL(
      `?token=${encryptWithAES(JSON.stringify(encodedData))}`,
      clientUrl,
    ).toString();

    console.log('check verificationUrl: ', verificationUrl);
    // await Promise.all([
    //   user.save(),
    //   this.mailService.sendVerification(user.email, verificationUrl),
    // ]);
    await user.save().then(() => {
      this.mailService.sendVerification(user.email, verificationUrl);
    });
  }

  async registerVerification(token: string) {
    const encodedData: IOtpCode = JSON.parse(decryptWithAES(token));

    if (encodedData.type !== EAuthType.REGISTER) {
      throw new BadRequestException(EError.INVALID_OTP_TYPE);
    }
    const pendingUser = await this.userRepository.findOneBy({
      email: encodedData.email,
      status: EUserStatus.PENDING,
    });

    if (!pendingUser) {
      throw new BadRequestException(EError.USER_NOT_FOUND);
    }

    const isValid = verifyOtp(encodedData.otp, pendingUser.otpSecret);
    if (!isValid) {
      throw new BadRequestException(EError.VERIFY_OTP_FAILED);
    }

    pendingUser.status = EUserStatus.ACTIVE;

    await this.userRepository.save(pendingUser);
  }

  async forgotPassword(email: string) {
    const existUser = await this.userRepository.findOneBy({ email });
    if (!existUser) {
      throw new BadRequestException(EError.USER_NOT_FOUND);
    }

    const otp = generateOtp(existUser.otpSecret, {
      step: 600,
      epoch: Date.now(),
      window: 1,
    });

    const encodedData: IOtpCode = {
      email,
      otp,
      type: EAuthType.FORGOT_PASSWORD,
    };

    const clientUrl = this.configService.get<string>(EEnv.CLIENT_URL);
    const forgotPasswordURL = new URL(
      `?forgot-password-token=${encryptWithAES(JSON.stringify(encodedData))}`,
      clientUrl,
    ).toString();

    await this.mailService.sendForgotPasswordVerificationUrl(
      existUser.email,
      forgotPasswordURL,
    );
  }

  async forgotPasswordVerification(token: string) {
    const encodedData: IOtpCode = JSON.parse(decryptWithAES(token));

    if (encodedData.type !== EAuthType.FORGOT_PASSWORD) {
      throw new BadRequestException(EError.INVALID_OTP_TYPE);
    }
    const user = await this.userRepository.findOneBy({
      email: encodedData.email,
    });

    if (!user) {
      throw new BadRequestException(EError.USER_NOT_FOUND);
    }

    const isValid = verifyOtp(encodedData.otp, user.otpSecret);

    return { isValid };
  }

  async resetPassword(data: ResetPasswordReqBody) {
    const userExist = await this.userRepository.findOneBy({
      email: data.email,
    });

    if (!userExist) {
      throw new BadRequestException(EError.USER_NOT_FOUND);
    }

    const password = hashPassword(data.password);

    userExist.password = password;

    await this.userRepository.save(userExist);
  }

  async refreshToken(refreshToken: string) {
    let decodedData: IJwtPayload;
    try {
      decodedData = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>(EEnv.JWT_REFRESH_TOKEN_SECRET),
      });
    } catch (error) {
      throw new BadRequestException(EError.REFRESH_TOKEN_INVALID);
    }
    console.log(decodedData);
  }

  async login(user: User) {
    const payload: IJwtPayload = {
      userId: user.id,
      status: user.status,
      roleId: user.roleId,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.signAccessToken(payload),
      this.signRefreshToken(payload),
    ]);

    return { accessToken, refreshToken };
  }

  async signAccessToken(payload: IJwtPayload) {
    return this.jwtService.signAsync(payload);
  }

  async signRefreshToken(payload: IJwtPayload) {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>(EEnv.JWT_REFRESH_TOKEN_SECRET),
      expiresIn: `${this.configService.get<number>(EEnv.JWT_REFRESH_TOKEN_EXPIRES_IN)}s`,
    });
  }
}
