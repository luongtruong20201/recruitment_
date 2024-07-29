import { Module } from '@nestjs/common';
import { ConfigurationModule } from './config/config.module';
import { DatabaseModule } from './config/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { MailModule } from './modules/mail/mail.module';
import { GuardModule } from './shared/modules/guard/guard.module';
import { FiltersModule } from './shared/modules/filters/filter.module';
import { InterceptorModule } from './shared/modules/interceptors/interceptor.module';
import { TagsModule } from './modules/tags/tags.module';
import { CompaniesModule } from './modules/companies/companies.module';

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule,
    GuardModule,
    FiltersModule,
    InterceptorModule,
    MailModule,
    AuthModule,
    TagsModule,
    CompaniesModule,
  ],
})
export class AppModule {}
