import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { EEnv } from 'src/constants/env.constant';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      validationSchema: Joi.object({
        [EEnv.PORT]: Joi.number().default(3000),
        [EEnv.SWAGGER]: Joi.string().default('docs'),

        [EEnv.DB_HOST]: Joi.string().default('localhost'),
        [EEnv.DB_PORT]: Joi.number().default(3306),
        [EEnv.DB_USERNAME]: Joi.string().required(),
        [EEnv.DB_PASSWORD]: Joi.string().required(),
        [EEnv.DB_DATABASE]: Joi.string().required(),

        [EEnv.EMAIL_HOST]: Joi.string().required(),
        [EEnv.EMAIL_USER]: Joi.string().required(),
        [EEnv.EMAIL_PASS]: Joi.string().required(),

        [EEnv.JWT_REFRESH_TOKEN_SECRET]: Joi.string().required(),
        [EEnv.JWT_REFRESH_TOKEN_EXPIRES_IN]: Joi.number().required(),
        [EEnv.JWT_ACCESS_TOKEN_SECRET]: Joi.string().required(),
        [EEnv.JWT_ACCESS_TOKEN_EXPIRES_IN]: Joi.number().required(),
      }),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigurationModule {}
