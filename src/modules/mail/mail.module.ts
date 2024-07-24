import { MailerModule, MailerOptions } from '@nestjs-modules/mailer';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EEnv } from 'src/constants/env.constant';
import { MailService } from './mail.service';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const options: MailerOptions = {
          transport: {
            // host: configService.get<string>(EEnv.EMAIL_HOST),
            service: 'gmail',
            auth: {
              user: configService.get<string>(EEnv.EMAIL_USER),
              pass: configService.get<string>(EEnv.EMAIL_PASS),
            },
          },
          defaults: {
            from: '"No Reply" <no-reply@localhost>',
          },
          preview: true,
        };
        return options;
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
