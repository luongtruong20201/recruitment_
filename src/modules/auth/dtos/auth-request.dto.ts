import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsJWT,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class LoginReqBody {
  @ApiProperty()
  @IsEmail()
  @Transform(({ value }) => value?.toLowerCase())
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class RegisterReqBody extends LoginReqBody {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNumber()
  age: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;
}

export class RegisterVerificationReqBody {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  token: string;
}

export class ForgotPasswordReqBody {
  @ApiProperty()
  @IsEmail()
  @Transform(({ value }) => value?.toLowerCase())
  email: string;
}

export class ForgotPasswordVerification extends RegisterVerificationReqBody {}

export class ResetPasswordReqBody extends LoginReqBody {}

export class RefreshTokeReqBody {
  @ApiProperty()
  @IsNotEmpty()
  @IsJWT()
  refreshToken: string;
}
