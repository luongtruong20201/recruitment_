import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EEnv } from 'src/constants/env.constant';
import { IJwtPayload } from 'src/constants/auth.constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>(EEnv.JWT_ACCESS_TOKEN_SECRET),
    });
  }

  async validate(payload: IJwtPayload) {
    console.log('check payload: ', payload);
    return payload;
  }
}
